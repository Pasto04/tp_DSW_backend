import { Request, Response, NextFunction } from "express";
import { orm } from "../../shared/db/orm.js";
import { Pedido } from "../../pedido/pedido.entity.js";
import { BebidaPedido } from "./bebidaPedido.entity.js";
import { Bebida } from '../bebida.entity.js';
import { validarBebidaPedido } from "./bebidaPedido.schema.js";
import { handleErrors } from "../../shared/errors/errorHandler.js";
import { PedidoNotFoundError } from "../../shared/errors/entityErrors/pedido.errors.js";
import { BebidaNotFoundError } from "../../shared/errors/entityErrors/bebida.errors.js";
import { BebidaPedidoAlreadyDeliveredError, BebidaPedidoNotFoundError } from "../../shared/errors/entityErrors/bebidaPedido.errors.js";

const em = orm.em

function sanitizeBebidaPedido(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    bebida: req.body.bebida,
    pedido: req.params.nroPed,
    fechaSolicitud: req.body.fechaSolicitud,
    horaSolicitud: req.body.horaSolicitud,
    cantidad: req.body.cantidad,
    entregado: true
  }
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {populate: ['cliente', 'mesa'], failHandler: () => {throw new PedidoNotFoundError}})
    const bebidaPedidos = await em.find(BebidaPedido, {pedido}, {populate: ['bebida', 'pedido']})
    res.status(200).json({message: `Todas las bebidas del pedido ${pedido.nroPed} han sido encontradas con éxito`, data: bebidaPedidos})
  } catch (error: any) {
    handleErrors(error, res)
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {populate: ['cliente', 'mesa'], failHandler: () => {throw new PedidoNotFoundError}})
    const codBebida = Number.parseInt(req.params.codBebida)
    const bebida = await em.findOneOrFail(Bebida, {codBebida}, {failHandler: () => {throw new BebidaNotFoundError}})
    const bebidaPedido = await em.findOneOrFail(BebidaPedido, {pedido, bebida}, {populate: ['bebida', 'pedido'], failHandler: () => {throw new BebidaPedidoNotFoundError}})
    res.status(200).json({message: `La bebida ${bebida.descripcion} del pedido ${pedido.nroPed} ha sido encontrada con éxito`, data: bebidaPedido})
  } catch (error: any) {
    handleErrors(error, res)
  }
}

async function add(req: Request, res: Response) {
  try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {failHandler: () => {throw new PedidoNotFoundError}})
    req.body.sanitizedInput.pedido = pedido
    const bebidaPedidoValida = validarBebidaPedido(req.body.sanitizedInput)
    const bebidaPedido = em.create(BebidaPedido, bebidaPedidoValida)
    await em.flush()
    res.status(201).json({data: bebidaPedido})
  } catch (error: any) {
    handleErrors(error, res)
  }
}


function isAlreadyDelivered(bebidaPedido: BebidaPedido): void {
  if(bebidaPedido.entregado === true) {
    throw new BebidaPedidoAlreadyDeliveredError
  }
}


/* NO TIENE SENTIDO ACTUALIZAR UNA BEBIDA DE UN PEDIDO. SI EL CLIENTE DESEA ORDENAR NUEVAMENTE UNA BEBIDA, SE CREARÁ Y QUEDARÁ 
REGISTRADA CON UNA HORA (Y QUIZÁS UNA FECHA) DISTINTA DENTRO DEL MISMO PEDIDO.
Este método únicamente permitirá a los usuarios (ya sea empleado o cliente) modificar el atributo "entregado" de BebidaPedido a "true".
*/
async function update(req: Request, res: Response) {
  try {
    const nroPed = Number.parseInt(req.params.nroPed)
    req.body.sanitizedInput.pedido = await em.findOneOrFail(Pedido, {nroPed}, {failHandler: () => {throw new PedidoNotFoundError}})
    const codBebida = Number.parseInt(req.params.codBebida)
    req.body.sanitizedInput.bebida = await em.findOneOrFail(Bebida, {codBebida}, {failHandler: () => {throw new BebidaNotFoundError}})
    const bebidaPedidoValida = validarBebidaPedido(req.body.sanitizedInput)
    const bebidaPedido = await em.findOneOrFail(BebidaPedido, bebidaPedidoValida, {failHandler: () => {throw new BebidaPedidoNotFoundError}})
    isAlreadyDelivered(bebidaPedido) //Validamos que la bebida no haya sido entregada
    em.assign(bebidaPedido, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({message: `La bebida ${bebidaPedido.bebida.descripcion} del pedido ${bebidaPedido.pedido.nroPed} ha sido entregada con éxito`, data: bebidaPedido})
  } catch (error: any) {
    handleErrors(error, res)
  }
}

async function remove(req: Request, res: Response) {
  try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {populate: ['cliente', 'mesa'], failHandler: () => {throw new PedidoNotFoundError}})
    const codBebida = Number.parseInt(req.params.codBebida)
    const bebida = await em.findOneOrFail(Bebida, {codBebida}, {failHandler: () => {throw new BebidaNotFoundError}})
    const bebidaPedido = await em.findOneOrFail(BebidaPedido, {pedido, bebida}, {failHandler: () => {throw new BebidaPedidoNotFoundError}})
    await em.removeAndFlush(bebidaPedido)
    res.status(200).json({message: `La bebida ${bebida.descripcion} del pedido ${pedido.nroPed} ha sido eliminada con éxito`, data: bebidaPedido})
  } catch (error: any) {
    handleErrors(error, res)
  }
}

export { sanitizeBebidaPedido, findAll, findOne, add, update, remove }