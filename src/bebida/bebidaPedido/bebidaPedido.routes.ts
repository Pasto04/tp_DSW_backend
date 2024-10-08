import { Router } from "express";
import { sanitizeBebidaPedido, update, remove } from './bebidaPedido.controller.js'

export const bebidaPedidoRouter = Router()

bebidaPedidoRouter.put('/:nroPed/bebidas/:codBebida', sanitizeBebidaPedido, update)
bebidaPedidoRouter.delete('/:nroPed/bebidas/:codBebida', remove)