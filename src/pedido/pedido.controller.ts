import { Request, Response, NextFunction } from 'express'
import { Pedido } from './pedido.entity.js'
import { orm } from '../shared/db/orm.js'
import { handleErrors } from '../shared/errors/errorHandler.js'
import { validarFindAll } from '../shared/validarFindAll.js'
import { PedidoNotFoundError } from '../shared/errors/entityErrors/pedido.errors.js'
import { validarPedido, validarPedidoFinalizar } from './pedido.schema.js'
import { Mesa } from '../mesa/mesa.entity.js'
import { MesaNotFoundError } from '../shared/errors/entityErrors/mesa.errors.js'

const em = orm.em

async function sanitizePedidoInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nroPed: req.body.nroPed,
    estado: req.body.estado,
    hora: req.body.hora,
    fecha: req.body.fecha,
    fechaCancelacion: req.body.fechaCancelacion,
    horaCancelacion: req.body.horaCancelacion,
    reseña: req.body.reseña,
    cliente: req.body.cliente,
    mesa: req.body.mesa,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

function sanitizeQuery(req: Request) {
  const queryResult: any = {
    estado: req.query.estado,
    fecha: req.query.fecha,
    fechaCancelacion: req.query.fechaCancelacion,
    mesa: req.query.mesa, //Asumo que me ingresan el número de la mesa
  }
  for (let key of Object.keys(queryResult)) {
    if (queryResult[key] === undefined) {
      delete queryResult[key]
    }
  }
  return queryResult
}

//Manejar posibles QueryStrings para filtrar pedidos por estado, fecha, fechaCancelación y mesa.
async function findAll(req: Request, res: Response) {
  try {
    const sanitizedQuery = sanitizeQuery(req)
    if (sanitizedQuery.mesa) {
      sanitizedQuery.mesa = em.findOneOrFail(Mesa, { nroMesa: Number.parseInt(sanitizedQuery.mesa) }, { failHandler: () => {throw new MesaNotFoundError()} })
    }
    const pedidos = validarFindAll(await em.find(Pedido, sanitizedQuery, { populate: ['cliente', 'mesa'] }), PedidoNotFoundError)
    res.status(200).json({ message: 'Todos los pedidos encontrados', data: pedidos })

  } catch (error: any) {
    handleErrors(error, res)
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, { nroPed }, { populate: ['cliente', 'mesa'] })
    res.status(200).json({ message: 'Pedido encontrado', data: pedido })

  } catch (error: any) {
    handleErrors(error, res)
  }
}

/* NO SE DEBERÍAN PODER CREAR, MODIFICAR NI ELIMINAR PEDIDOS DESDE UN USUARIO EMPLEADO. 
ESTE SÓLO DEBERÍA PODER VER O ACCEDER A TODOS LOS PEDIDOS PARA OBTENER LISTADOS Y HACER ESTADÍSTICAS.

Sin embargo, deberían ser capaces de modificar el estado de entrega de los platos y bebidas de un pedido en curso (entregado de false a true)
async function add(req:Request,res:Response) {
  try{
    const pedidoValido = validarPedido(req.body)
    const pedido = em.create(Pedido, pedidoValido)
    await em.flush()
    res.status(201).json({message: 'Pedido creado', data:pedido})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function update (req:Request,res:Response){
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedidoToUpdate = await em.findOneOrFail(Pedido, {nroPed})
    let pedidoUpdated
    if(req.method === 'PATCH') {
      pedidoUpdated = validarPedidoPatch(req.body)
    } else {
      pedidoUpdated = validarPedido(req.body)
    }
    em.assign(pedidoToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({message: 'Pedido actualizado', data: pedidoToUpdate})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function remove (req:Request,res:Response) {
    try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed})
    em.removeAndFlush(pedido)
    res.status(200).json({message: 'El pedido ha sido eliminado con éxito', data: pedido})
  } catch(error: any) {
    handleErrors(error, res)
  }
}
*/

export { sanitizePedidoInput, findAll, findOne /*,add,update,remove*/ }
