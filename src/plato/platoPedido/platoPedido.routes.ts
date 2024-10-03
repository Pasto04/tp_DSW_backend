import { Router } from 'express'
import { findAll, remove, update, sanitizePlatoPedido } from './platoPedido.controller.js'

export const platoPedidoRouter = Router()

platoPedidoRouter.get('/:nroPed/platos', findAll)

platoPedidoRouter.put('/:nroPed/platos/:nro', sanitizePlatoPedido, update)

platoPedidoRouter.delete('/:nroPed/platos/:nro', remove)