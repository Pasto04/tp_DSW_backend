import { Router } from "express";
import { sanitizeBebidaPedido, findAll, findOne, add, remove } from './bebidaPedido.controller.js'

export const bebidaPedidoRouter = Router()

bebidaPedidoRouter.get('/:nroPed/bebidas', findAll)
bebidaPedidoRouter.get('/:nroPed/bebidas/:codBebida', findOne)
bebidaPedidoRouter.post('/:nroPed/bebidas', sanitizeBebidaPedido, add)
bebidaPedidoRouter.delete('/:nroPed/bebidas/:codBebida', remove)