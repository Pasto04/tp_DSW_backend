import { Router } from 'express'
import { add, findAll, findOne, remove, sanitizePedidoClienteInput, update } from './pedidoCliente.controller.js'

export const pedidoClienteRouter = Router()

pedidoClienteRouter.get('/:id/pedidos', findAll)

pedidoClienteRouter.get('/:id/pedidos/:nroPed', findOne)

pedidoClienteRouter.post('/:id/pedidos', sanitizePedidoClienteInput, add)

pedidoClienteRouter.patch('/:id/pedidos/:nroPed', sanitizePedidoClienteInput, update)

pedidoClienteRouter.delete('/:id/pedidos/:nroPed', sanitizePedidoClienteInput, remove)