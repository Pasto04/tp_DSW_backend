import { Request,Response,NextFunction } from "express"
import { Pedido } from "./pedido.entity.js"
import { orm } from "../shared/db/orm.js"
import { Usuario } from "../usuario/usuario.entity.js"
import { handleErrors } from "../shared/errors/errorHandler.js"
import { PedidoAlreadyEndedError, PedidoAlreadyExistsError, PedidoAlreadyInUseError, PedidoNotFoundError, PedidoPreconditionFailed, PedidoUniqueConstraintViolationError } from "../shared/errors/entityErrors/pedido.errors.js"
import { validarBebidaOfPedido, validarPedido, validarPedidoPatch, validarPedidoPut, validarPlatoOfPedido } from "./pedido.schema.js"
import { Mesa } from "../mesa/mesa.entity.js"
import { UsuarioNotFoundError } from "../shared/errors/entityErrors/usuario.errors.js"
import { MesaAllBusyError, MesaCodigoError, MesaNotFoundError } from "../shared/errors/entityErrors/mesa.errors.js"
import { validarFindAll } from "../shared/validarFindAll.js"
import { validarMesa } from "../mesa/mesa.schema.js"
import { Plato } from "../plato/plato.entity.js"
import { PlatoNotFoundError } from "../shared/errors/entityErrors/plato.errors.js"
import { PlatoPedido } from "../plato/platoPedido/platoPedido.entity.js"
import { Bebida } from "../bebida/bebida.entity.js"
import { BebidaNotFoundError } from "../shared/errors/entityErrors/bebida.errors.js"
import { BebidaPedido } from "../bebida/bebidaPedido/bebidaPedido.entity.js"
import { Pago } from "./pago/pago.entity.js"
import { PagoNotFoundError } from "../shared/errors/entityErrors/pago.errors.js"

const em = orm.em

async function sanitizePedidoCliente(req:Request, res:Response, next:NextFunction){
  req.body.sanitizedInput = {
    nroPed: req.body.nroPed,
    estado: req.body.estado,
    hora: req.body.hora,
    fecha: req.body.fecha,
    fechaCancelacion: req.body.fechaCancelacion,
    horaCancelacion: req.body.horaCancelacion,
    cliente: req.params.id,
    mesa: req.body.mesa,
    pago: req.body.pago
  }
  Object.keys(req.body.sanitizedInput).forEach(key => {
    if(req.body.sanitizedInput[key] === undefined){
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

function sanitizeQuery(req: Request) {
  const queryResult: any = {
    fecha: req.query.fecha,
    fechaCancelacion: req.query.fechaCancelacion,
  }
  for(let key of Object.keys(queryResult)) {
    if(queryResult[key] === undefined) {
      delete queryResult[key]
    }
  }
  return queryResult
}

async function findAll(req:Request,res:Response) {
  try{
    const sanitizedQuery = sanitizeQuery(req)
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Usuario, {id}, {failHandler: () => {throw new UsuarioNotFoundError}})
    sanitizedQuery.cliente = cliente
    const pedidos = validarFindAll(await em.find(Pedido, sanitizedQuery), PedidoNotFoundError)
    res.status (200).json({message: `Todos los pedidos del cliente ${cliente.nombre} ${cliente.apellido} encontrados con éxito`, data: pedidos})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function findOne(req:Request,res:Response) {
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {populate: ['platosPedido', 'bebidasPedido', 'cliente'], failHandler: () => {throw new PedidoNotFoundError}})
    res.status(200).json({message: `Pedido ${nroPed} del cliente ${pedido.cliente.nombre} ${pedido.cliente.apellido} encontrado`, data: pedido})
  } catch (error:any){
    handleErrors(error, res)
  }
}


function pedidoAlreadyExists(cliente: Usuario): void {
  cliente.pedidos.getItems().forEach((pedido) => {
    if(pedido.estado === 'en curso') {
      throw new PedidoAlreadyExistsError
    }
  })
}

async function allMesasBusy() {
  const mesas = await em.find(Mesa, {estado: 'Disponible'})
  if(mesas.length === 0) {
    throw new MesaAllBusyError
  }
}


async function add(req:Request,res:Response) {
  try{
    if((await em.find(Usuario, {tipoUsuario: 'cliente'})).length === 0 || (await em.find(Mesa, {})).length === 0) {
      throw new PedidoPreconditionFailed
    }
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Usuario, {id}, {populate: ['pedidos'], failHandler: () => {throw new UsuarioNotFoundError}})
    pedidoAlreadyExists(cliente) // Verifico que el cliente no tenga un pedido en curso
    allMesasBusy() // Valido que haya mesas disponibles. Igualmente, la mesa ingresada en la request debería estar disponible.
    req.body.sanitizedInput.cliente = cliente
    req.body.sanitizedInput.mesa = await em.findOneOrFail(Mesa, {nroMesa: req.body.sanitizedInput.mesa}, {failHandler: () => {throw new MesaNotFoundError}})
    const mesaUpdated = validarMesa(req.body.sanitizedInput.mesa)
    mesaUpdated.estado = 'Ocupada'
    em.assign(req.body.sanitizedInput.mesa, mesaUpdated)
    validarPedido(req.body.sanitizedInput)
    const pedido = em.create(Pedido, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({data:pedido})
  } catch (error:any){
    handleErrors(error, res)
  }
}


async function fillSanitizedInput(pedido: Pedido, req: Request) {
  req.body.sanitizedInput.estado = 'finalizado'
  req.body.sanitizedInput.fecha = pedido.fecha
  req.body.sanitizedInput.hora = pedido.hora
  req.body.sanitizedInput.cliente = pedido.cliente
  req.body.sanitizedInput.mesa = pedido.mesa
  req.body.sanitizedInput.platosPedido = pedido.platosPedido.getItems()
  req.body.sanitizedInput.bebidasPedido = pedido.bebidasPedido.getItems()
}


// Permite cancelar un pedido sin platos y bebidas y, por otro lado, añadir platos y bebidas al pedido con PATCH
// En caso de querer finalizar el pedido, se debe usar PUT.
async function update (req:Request,res:Response){
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedidoToUpdate = await em.findOneOrFail(Pedido, {nroPed}, {populate: ['platosPedido', 'bebidasPedido', 'cliente'], failHandler: () => {throw new PedidoNotFoundError}})
    if(pedidoToUpdate.estado === 'finalizado' || pedidoToUpdate.estado === 'cancelado') {
      throw new PedidoAlreadyEndedError
    }
    let pedidoUpdated
    if(req.method === 'PATCH') {
      pedidoUpdated = validarPedidoPatch(req.body.sanitizedInput)
      if(req.body.sanitizedInput.estado && pedidoToUpdate.platosPedido.length === 0 && pedidoToUpdate.bebidasPedido.length === 0) {
        pedidoToUpdate.establecerFechaYHoraCancelacion()
      } else if(req.body.sanitizedInput.estado) {
        throw new PedidoAlreadyInUseError
      } else {
        let platosOfPedido: {numPlato: number, cantidad: number}[] | undefined
        if(req.body.platos) {
          platosOfPedido = validarPlatoOfPedido(req.body.platos)
          await Promise.all(platosOfPedido.map(async (platoOfPedido) => {
            const plato = await em.findOneOrFail(Plato, {numPlato: platoOfPedido.numPlato}, {failHandler: () => {throw new PlatoNotFoundError}})
            const platoPedido = em.create(PlatoPedido, {pedido: pedidoToUpdate, plato, cantidad: platoOfPedido.cantidad})
            em.persist(platoPedido)
          }))
        }
        let bebidasOfPedido: {codBebida: number, cantidad: number}[] | undefined
        if(req.body.bebidas) {
          bebidasOfPedido = validarBebidaOfPedido(req.body.bebidas)
          await Promise.all(bebidasOfPedido.map(async (bebidaOfPedido) => {
            const bebida = await em.findOneOrFail(Bebida, {codBebida: bebidaOfPedido.codBebida}, {failHandler: () => {throw new BebidaNotFoundError}})
            const bebidaPedido = em.create(BebidaPedido, {pedido: pedidoToUpdate, bebida, cantidad: bebidaOfPedido.cantidad})
            em.persist(bebidaPedido)
          }))
        }
      }
    } else {
      fillSanitizedInput(pedidoToUpdate, req)
      req.body.sanitizedInput.pago = await em.findOneOrFail(Pago, {pedido: pedidoToUpdate}, {failHandler: () => {throw new PagoNotFoundError}})
      pedidoUpdated = validarPedidoPut(req.body.sanitizedInput)
      let mesaDesocupada = pedidoUpdated.mesa
      mesaDesocupada.estado = 'Disponible'
      em.assign(pedidoUpdated.mesa, mesaDesocupada)
    }

    em.assign(pedidoToUpdate, pedidoUpdated)
    await em.flush()
    res.status(200).json({message: `Pedido ${nroPed} del cliente ${pedidoToUpdate.cliente.nombre} ${pedidoToUpdate.cliente.apellido} ha sido actualizado`, data: pedidoToUpdate})
  } catch (error:any){
    if(error.name === 'UniqueConstraintViolationException') {
      error = new PedidoUniqueConstraintViolationError
    }
    handleErrors(error, res)
  }
}

// Por ahora permite eliminar el pedido, pero lo ideal sería cancelarlo (es decir, este método será eliminado)
async function remove (req:Request,res:Response) {
    try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {populate: ['platosPedido', 'bebidasPedido', 'cliente'], failHandler: () => {throw new PedidoNotFoundError}})
    if(pedido.platosPedido.length > 0) {
      pedido.platosPedido.getItems().forEach((platoPedido) => {
        if(platoPedido.entregado) {
          throw new PedidoAlreadyInUseError
        }
      })
    } else if(pedido.bebidasPedido.length > 0) {
      pedido.bebidasPedido.getItems().forEach((bebidaPedido) => {
        if(bebidaPedido.entregado) {
          throw new PedidoAlreadyInUseError
        }
      })
    }
    await em.removeAndFlush(pedido)
    res.status(200).json({message: `El pedido ${nroPed} del cliente ${pedido.cliente.nombre} ${pedido.cliente.apellido} ha sido eliminado con éxito`, data: pedido})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

export {sanitizePedidoCliente, findAll, findOne, add, update, remove}