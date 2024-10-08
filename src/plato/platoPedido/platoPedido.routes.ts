import { Router } from 'express'
import { remove, update, sanitizePlatoPedido } from './platoPedido.controller.js'

export const platoPedidoRouter = Router()

platoPedidoRouter.put('/:nroPed/platos/:nro', sanitizePlatoPedido, update)

platoPedidoRouter.delete('/:nroPed/platos/:nro', remove)