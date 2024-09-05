import { NextFunction, Request, Response } from "express";
import { orm } from "../shared/db/orm.js";
import { Pedido } from "../pedido/pedido.entity.js";
import { BebidaPedido } from "./bebidaPedido.entity.js";
import { Bebida } from "./bebida.entity.js";


const em = orm.em

function sanitizeBebidaPedido(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    bebida: req.body.bebida,
    pedido: req.params.nroPed,
    fechaSolicitud: req.body.fechaSolicitud,
    horaSolicitud: req.body.horaSolicitud,
    cantidad: req.body.cantidad,
    entregado: req.body.entregado
  }

  Object.keys(req.body.sanitizedInput).forEach((keys) => {
    if(req.body.sanitizedInput[keys] === undefined) {
      delete req.body.sanitizedInput[keys]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {populate: ['cliente', 'mesa']})
    const bebidaPedidos = await em.find(BebidaPedido, {pedido}, {populate: ['bebida', 'pedido']})
    res.status(200).json({message: `Todas las bebidas del pedido ${pedido.nroPed} han sido encontradas con éxito`, data: bebidaPedidos})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {populate: ['cliente', 'mesa']})
    const codBebida = Number.parseInt(req.params.codBebida)
    const bebida = await em.findOneOrFail(Bebida, {codBebida})
    const bebidaPedido = await em.findOneOrFail(BebidaPedido, {pedido, bebida}, {populate: ['bebida', 'pedido']})
    res.status(200).json({message: `La bebida ${bebida.descripcion} del pedido ${pedido.nroPed} ha sido encontrada con éxito`, data: bebidaPedido})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function add(req: Request, res: Response) {
  try {
    const bebidaPedido = em.create(BebidaPedido, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({data: bebidaPedido})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {populate: ['cliente', 'mesa']})
    const codBebida = Number.parseInt(req.params.codBebida)
    const bebida = await em.findOneOrFail(Bebida, {codBebida})
    const bebidaPedido = await em.findOneOrFail(BebidaPedido, {pedido, bebida})
    em.assign(bebidaPedido, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({message: `La bebida ${bebida.descripcion} del pedido ${pedido.nroPed} ha sido actualizada con éxito`, data: bebidaPedido})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function remove(req: Request, res: Response) {
  try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {populate: ['cliente', 'mesa']})
    const codBebida = Number.parseInt(req.params.codBebida)
    const bebida = await em.findOneOrFail(Bebida, {codBebida})
    const bebidaPedido = await em.findOneOrFail(BebidaPedido, {pedido, bebida})
    await em.removeAndFlush(bebidaPedido)
    res.status(200).json({message: `La bebida ${bebida.descripcion} del pedido ${pedido.nroPed} ha sido eliminada con éxito`, data: bebidaPedido})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

export { findAll, findOne, add, update, remove, sanitizeBebidaPedido }