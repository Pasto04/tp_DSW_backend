import { Router } from 'express'
import { add, findAll, findOne, remove, sanitizePedidoCliente, update } from './pedidoCliente.controller.js'

export const pedidoClienteRouter = Router()

pedidoClienteRouter.get('/:id/pedidos', findAll)

pedidoClienteRouter.get('/:id/pedidos/:nroPed', findOne)

pedidoClienteRouter.post('/:id/pedidos', sanitizePedidoCliente, add) // Crear pedido

pedidoClienteRouter.put('/:id/pedidos/:nroPed', sanitizePedidoCliente, update) // Pagar y finalizar pedido

pedidoClienteRouter.patch('/:id/pedidos/:nroPed', sanitizePedidoCliente, update) // Agregar plato/s y bebida/s o Cancelar Pedido

pedidoClienteRouter.delete('/:id/pedidos/:nroPed', remove)
// En realidad lo ideal sería no eliminar ningún pedido, sino cancelarlos.