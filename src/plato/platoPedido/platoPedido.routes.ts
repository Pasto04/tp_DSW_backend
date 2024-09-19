import { Router } from 'express'
import { findAll, remove, add, sanitizePlatoPedido } from './platoPedido.controller.js'
import { findOne } from './platoPedido.controller.js'

export const platoPedidoRouter = Router()

platoPedidoRouter.get('/:nroPed/platos', findAll)

platoPedidoRouter.get('/:nroPed/platos/:nro', findOne)

platoPedidoRouter.post('/:nroPed/platos', sanitizePlatoPedido, add)

platoPedidoRouter.delete('/:nroPed/platos/:nro', remove)