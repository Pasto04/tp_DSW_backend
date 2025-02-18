import { Router } from 'express'
import { findAll, findOne, add, remove, update, sanitizePlatoPedido } from './platoPedido.controller.js'

export const platoPedidoRouter = Router()

platoPedidoRouter.get('/:nroPed/platos', findAll)

platoPedidoRouter.get('/:nroPed/platos/:nro/fecha/:fecha/hora/:hora', findOne)

platoPedidoRouter.post('/:nroPed/platos', sanitizePlatoPedido, add)

platoPedidoRouter.put('/:nroPed/platos/:nro/fecha/:fecha/hora/:hora', sanitizePlatoPedido, update)

platoPedidoRouter.delete('/:nroPed/platos/:nro/fecha/:fecha/hora/:hora', remove)
