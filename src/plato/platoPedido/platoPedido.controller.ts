import { NextFunction, Request, Response } from "express";
import { orm } from "../../shared/db/orm.js";
import { Pedido } from "../../pedido/pedido.entity.js";
import { PlatoPedido } from "./platoPedido.entity.js";
import { Plato } from "../plato.entity.js";
import { validarPlatoPedido } from "./platoPedido.schema.js";
import { PedidoNotFoundError } from "../../shared/errors/entityErrors/pedido.errors.js";
import { PlatoNotFoundError } from "../../shared/errors/entityErrors/plato.errors.js";
import { PlatoPedidoAlreadyDeliveredError, PlatoPedidoNotFoundError } from "../../shared/errors/entityErrors/platoPedido.errors.js";
import { handleErrors } from "../../shared/errors/errorHandler.js";
import { validarFindAll } from "../../shared/validarFindAll.js";

const em = orm.em

function sanitizePlatoPedido(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    pedido: req.params.nroPed,
    plato: req.body.plato,
    fechaSolicitud: req.body.fechaSolicitud,
    horaSolicitud: req.body.horaSolicitud,
    cantidad: req.body.cantidad,
    entregado: true
  }
  next()
}

// Es posible que termine siendo eliminado, pero por ahora lo utilizo para ver las distintas instancias
async function findAll(req: Request, res: Response) {
  try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {failHandler: () => {throw new PedidoNotFoundError}})
    const platosPed = validarFindAll(await em.find(PlatoPedido, {pedido}), PlatoPedidoNotFoundError)
    res.status(200).json({message: 'Platos del pedido encontrados', data: platosPed})
  } catch(error: any){
    handleErrors(error, res)
  }
}


function isAlreadyDelivered(platoPedido: PlatoPedido): void {
  if(platoPedido.entregado === true) {
    throw new PlatoPedidoAlreadyDeliveredError
  }
}


/*NO TIENE SENTIDO ACTUALIZAR UN PLATO DE UN PEDIDO. SI EL CLIENTE DESEA ORDENAR NUEVAMENTE UN PLATO, SE CREARÁ Y QUEDARÁ 
REGISTRADO CON UNA HORA (Y QUIZÁS UNA FECHA) DISTINTA DENTRO DEL MISMO PEDIDO.
Este método únicamente permitirá a los usuarios (ya sea empleado o cliente) modificar el atributo "entregado" de PlatoPedido a "true".
*/
async function update(req: Request, res: Response) {
  try{
    const numPlato = Number.parseInt(req.params.nro)
    req.body.sanitizedInput.plato = await em.findOneOrFail(Plato, {numPlato}, {failHandler: () => {throw new PlatoNotFoundError}})
    const nroPed = Number.parseInt(req.params.nroPed)
    req.body.sanitizedInput.pedido = await em.findOneOrFail(Pedido, {nroPed}, {populate: ['cliente'], failHandler: () => {throw new PedidoNotFoundError}})
    const platoPedValido = validarPlatoPedido(req.body.sanitizedInput)
    const platoPed = await em.findOneOrFail(PlatoPedido, platoPedValido, {failHandler: () => {throw new PlatoPedidoNotFoundError}})
    isAlreadyDelivered(platoPed) //Validamos que el plato no haya sido entregado
    em.assign(platoPed, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({message: `El plato [${platoPed.plato.descripcion}] del cliente [${platoPed.pedido.cliente.nombre} ${platoPed.pedido.cliente.apellido}] ha sido entregado con éxito`, data: platoPed})
  } catch(error:any){
    res.status(500).json({message: error.message})
  }
}

async function remove(req: Request, res: Response) {
  try {
    const numPlato = Number.parseInt(req.params.nro)
    const nroPed = Number.parseInt(req.params.nroPed)
    const plato = await em.findOneOrFail(Plato, {numPlato}, {failHandler: () => {throw new PlatoNotFoundError}})
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {failHandler: () => {throw new PedidoNotFoundError}})
    const platoPed = await em.findOneOrFail(PlatoPedido, {plato, pedido}, {failHandler: () => {throw new PlatoPedidoNotFoundError}})
    await em.removeAndFlush(platoPed)
    res.status(200).json({message: 'El pedido ha sido eliminado', data: platoPed})
  } catch(error:any) {
    handleErrors(error, res)
  }
}

export { findAll, update, remove, sanitizePlatoPedido }