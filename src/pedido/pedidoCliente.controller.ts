import { Request,Response,NextFunction } from "express"
import { Pedido } from "./pedido.entity.js"
import { orm } from "../shared/db/orm.js"
import { Usuario } from "../usuario/usuario.entity.js"
import { handleErrors } from "../shared/errors/errorHandler.js"
import { PedidoAlreadyEndedError, PedidoAlreadyExistsError, PedidoAlreadyInUseError, PedidoNotFoundError, PedidoPreconditionFailed } from "../shared/errors/entityErrors/pedido.errors.js"
import { validarPedido, validarPedidoPatch } from "./pedido.schema.js"
import { Mesa } from "../mesa/mesa.entity.js"
import { UsuarioNotFoundError } from "../shared/errors/entityErrors/usuario.errors.js"
import { MesaAllBusyError, MesaNotFoundError } from "../shared/errors/entityErrors/mesa.errors.js"
import { validarFindAll } from "../shared/validarFindAll.js"

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

async function findAll(req:Request,res:Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Usuario, {id}, {failHandler: () => {throw new UsuarioNotFoundError}})
    const pedidos = validarFindAll(await em.find(Pedido, {cliente}), PedidoNotFoundError)
    res.status (200).json({message: `Todos los pedidos del cliente ${cliente.nombre} ${cliente.apellido} encontrados con éxito`, data: pedidos})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function findOne(req:Request,res:Response) {
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Usuario, {id}, {failHandler: () => {throw new UsuarioNotFoundError}}) 
    const pedido = await em.findOneOrFail(Pedido, {nroPed, cliente}, {failHandler: () => {throw new PedidoNotFoundError}})
    res.status(200).json({message: `Pedido ${nroPed} del cliente ${cliente.nombre} ${cliente.apellido} encontrado`, data: pedido})
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
    req.body.sanitizedInput.unidadMedida.toLowerCase()
    req.body.sanitizedInput.cliente = cliente
    req.body.sanitizedInput.mesa = await em.findOneOrFail(Mesa, {nroMesa: req.body.sanitizedInput.mesa}, {failHandler: () => {throw new MesaNotFoundError}})
    validarPedido(req.body.sanitizedInput)
    const pedido = em.create(Pedido, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({data:pedido})
  } catch (error:any){
    handleErrors(error, res)
  }
}

// Permite cancelar un pedido sin platos y bebidas y, por otro lado, añadir platos y bebidas al pedido con PATCH
// En caso de querer finalizar el pedido, se debe usar PUT.
async function update (req:Request,res:Response){
  try{
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Usuario, {id}, {failHandler: () => {throw new UsuarioNotFoundError}})
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedidoToUpdate = await em.findOneOrFail(Pedido, {nroPed}, {failHandler: () => {throw new PedidoNotFoundError}})
    if(pedidoToUpdate.estado === 'finalizado') {
      throw new PedidoAlreadyEndedError
    }
    let pedidoUpdated
    if(req.method === 'PATCH') {
      
      pedidoUpdated = validarPedidoPatch(req.body.sanitizedInput)

    } else {

    }

    em.assign(pedidoToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({message: `Pedido ${nroPed} del cliente ${cliente.nombre} ${cliente.apellido} ha sido actualizado`, data: pedidoToUpdate})
  } catch (error:any){
    handleErrors(error, res)
  }
}

// Por ahora permite eliminar el pedido, pero lo ideal sería cancelarlo (es decir, este método será eliminado)
async function remove (req:Request,res:Response) {
    try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Usuario, {id}, {failHandler: () => {throw new UsuarioNotFoundError}})
    const pedido = await em.findOneOrFail(Pedido, {nroPed, cliente}, {populate: ['platosPedido', 'bebidasPedido'], failHandler: () => {throw new PedidoNotFoundError}})
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
    res.status(200).json({message: `El pedido ${nroPed} del cliente ${cliente.nombre} ${cliente.apellido} ha sido eliminado con éxito`, data: pedido})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

export {sanitizePedidoCliente, findAll, findOne, add, update, remove}