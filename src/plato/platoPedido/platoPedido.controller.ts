import { NextFunction, Request, Response } from "express";
import { orm } from "../../shared/db/orm.js";
import { Pedido } from "../../pedido/pedido.entity.js";
import { PlatoPedido } from "./platoPedido.entity.js";
import { Plato } from "../plato.entity.js";
import { validarPlatoPedido } from "./platoPedido.schema.js";
import { PedidoNotFoundError } from "../../shared/errors/entityErrors/pedido.errors.js";
import { PlatoNotFoundError } from "../../shared/errors/entityErrors/plato.errors.js";
import { PlatoPedidoNotFoundError } from "../../shared/errors/entityErrors/platoPedido.errors.js";
import { handleErrors } from "../../shared/errors/errorHandler.js";

const em = orm.em

function sanitizePlatoPedido(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    pedido: req.params.nroPed,
    plato: req.body.plato,
    fechaSolicitud: req.body.fechaSolicitud,
    horaSolicitud: req.body.horaSolicitud,
    cantidad: req.body.cantidad,
    entregado: req.body.entregado
  }
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {populate: ['cliente'], 
      failHandler: () => {throw new PedidoNotFoundError}})
    const platosPed = await em.find(PlatoPedido, {pedido}, {populate: ['plato', 'pedido']})
    res.status(200).json({message: 'Platos del pedido encontrados', data: platosPed})
  } catch(error: any){
    handleErrors(error, res)
  }
}
async function findOne(req: Request, res: Response) {
  try{
    const numPlato = Number.parseInt(req.params.nro)
    const nroPed = Number.parseInt(req.params.nroPed)
    const plato = await em.findOneOrFail(Plato, {numPlato}, {populate: ['tipoPlato'], 
      failHandler: () => {throw new PlatoNotFoundError}})
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {failHandler: () => {throw new PedidoNotFoundError}})
    const platoPed = await em.findOneOrFail(PlatoPedido, {plato, pedido}, {populate: ['plato', 'pedido'], 
      failHandler: () => {throw new PlatoPedidoNotFoundError}})
    res.status(200).json({message: `El plato del pedido ha sido encontrada con éxito`, data: platoPed})
  } catch(error:any){
    handleErrors(error, res)
  }
}

async function add(req: Request, res: Response) {
  try {
    req.body.sanitizedInput.pedido = await em.findOneOrFail(Pedido, {nroPed: Number.parseInt(req.body.sanitizedInput.pedido)}, 
      {failHandler: () => {throw new PedidoNotFoundError}})
    const platoPedidoValido = validarPlatoPedido(req.body.sanitizedInput)
    const platoPed = em.create(PlatoPedido, platoPedidoValido)
    await em.flush()
    res.status(201).json({data: platoPed})
  } catch (error: any) {
    handleErrors(error, res)
  }
}
/*NO TIENE SENTIDO ACTUALIZAR UN PLATO DE UN PEDIDO. SI EL CLIENTE DESEA ORDENAR NUEVAMENTE UN PLATO, SE CREARÁ Y QUEDARÁ 
REGISTRADO CON UNA HORA (Y QUIZÁS UNA FECHA) DISTINTA DENTRO DEL MISMO PEDIDO.
async function update(req: Request, res: Response) {
  try{
    const numPlato = Number.parseInt(req.params.nro)
    const nroPed = Number.parseInt(req.params.nroPed)
    const plato = await em.findOneOrFail(Plato, {numPlato})
    const pedido = await em.findOneOrFail(Pedido, {nroPed})
    const platoPed = await em.findOneOrFail(PlatoPedido, {plato, pedido})
    em.assign(platoPed, req.body.sanitizedPlatoPedido)
    em.flush()
    res.status(200).json({message: 'Actualiza la cantidad de pedidos', data: platoPed})
  } catch(error:any){
    res.status(500).json({message: error.message})
  }
}*/

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

export { findAll, findOne, add, remove, sanitizePlatoPedido }