import { Router } from 'express'
import { findAll, remove, add, update, sanitizePlatoPedido } from './platoPedido.controller.js'
import { findOne } from './platoPedido.controller.js'

export const platoPedidoRouter = Router()

platoPedidoRouter.get('/:nroPed/platos', findAll)

platoPedidoRouter.get('/:nroPed/platos/:nro', findOne) // Revisar si tiene sentido un getOne para esta entidad

platoPedidoRouter.post('/:nroPed/platos', sanitizePlatoPedido, add)

platoPedidoRouter.put('/:nroPed/platos/:nro', sanitizePlatoPedido, update)

platoPedidoRouter.delete('/:nroPed/platos/:nro', remove)