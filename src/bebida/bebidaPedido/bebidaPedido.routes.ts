import { Router } from 'express'
import { sanitizeBebidaPedido, findAll, findOne, add, update, remove} from './bebidaPedido.controller.js'
import { verificarToken } from '../../shared/authMiddleware.js'

export const bebidaPedidoRouter = Router()

bebidaPedidoRouter.get('/:nroPed/bebidas', verificarToken, findAll)

bebidaPedidoRouter.get('/:nroPed/bebidas/:codBebida/fecha/:fecha/hora/:hora', verificarToken, findOne)

bebidaPedidoRouter.post('/:nroPed/bebidas', verificarToken, sanitizeBebidaPedido, add)

bebidaPedidoRouter.put('/:nroPed/bebidas/:codBebida/fecha/:fecha/hora/:hora', verificarToken, sanitizeBebidaPedido, update)

bebidaPedidoRouter.delete('/:nroPed/bebidas/:codBebida/fecha/:fecha/hora/:hora', verificarToken, remove)
