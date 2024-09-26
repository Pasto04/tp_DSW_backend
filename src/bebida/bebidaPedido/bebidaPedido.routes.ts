import { Router } from "express";
import { sanitizeBebidaPedido, findAll, findOne, add, update, remove } from './bebidaPedido.controller.js'

export const bebidaPedidoRouter = Router()

bebidaPedidoRouter.get('/:nroPed/bebidas', findAll)
bebidaPedidoRouter.get('/:nroPed/bebidas/:codBebida', findOne) // Revisar si tiene sentido un getOne para esta entidad
bebidaPedidoRouter.post('/:nroPed/bebidas', sanitizeBebidaPedido, add)
bebidaPedidoRouter.put('/:nroPed/bebidas/:codBebida', sanitizeBebidaPedido, update)
bebidaPedidoRouter.delete('/:nroPed/bebidas/:codBebida', remove)