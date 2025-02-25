import { Router } from 'express'
import { findAll, findOne, add, remove, update, sanitizePlatoPedido } from './platoPedido.controller.js'
import { verificarToken } from '../../shared/authMiddleware.js'

export const platoPedidoRouter = Router()

platoPedidoRouter.get('/:nroPed/platos', verificarToken, findAll)

platoPedidoRouter.get('/:nroPed/platos/:nro/fecha/:fecha/hora/:hora', verificarToken, findOne)

platoPedidoRouter.post('/:nroPed/platos', verificarToken, sanitizePlatoPedido, add)

platoPedidoRouter.put('/:nroPed/platos/:nro/fecha/:fecha/hora/:hora', verificarToken, sanitizePlatoPedido, update)

platoPedidoRouter.delete('/:nroPed/platos/:nro/fecha/:fecha/hora/:hora', verificarToken, remove)
