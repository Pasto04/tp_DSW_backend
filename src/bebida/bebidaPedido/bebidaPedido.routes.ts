import { Router } from 'express'
import { sanitizeBebidaPedido, findAll, findOne, add, update, remove} from './bebidaPedido.controller.js'

export const bebidaPedidoRouter = Router()

bebidaPedidoRouter.get('/:nroPed/bebidas', findAll)

bebidaPedidoRouter.get('/:nroPed/bebidas/:codBebida/fecha/:fecha/hora/:hora', findOne)

bebidaPedidoRouter.post('/:nroPed/bebidas', sanitizeBebidaPedido, add)

bebidaPedidoRouter.put('/:nroPed/bebidas/:codBebida/fecha/:fecha/hora/:hora', sanitizeBebidaPedido, update)

bebidaPedidoRouter.delete('/:nroPed/bebidas/:codBebida/fecha/:fecha/hora/:hora', remove)
