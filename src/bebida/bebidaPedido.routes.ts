import { Router } from "express";
import { findAll, findOne, add, update, remove, sanitizeBebidaPedido } from './bebidaPedido.controller.js'

export const bebidaPedidoRouter = Router()

bebidaPedidoRouter.get('/:nroPed/bebidas', findAll)
bebidaPedidoRouter.get('/:nroPed/bebidas/:codBebida', findOne)
bebidaPedidoRouter.post('/:nroPed/bebidas', sanitizeBebidaPedido, add)
bebidaPedidoRouter.patch('/:nroPed/bebidas/:codBebida', sanitizeBebidaPedido, update)
bebidaPedidoRouter.delete('/:nroPed/bebidas/:codBebida', remove)