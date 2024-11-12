import { Router } from 'express'
import { add, findAll, findOne, remove, sanitizePedidoCliente, update, cancel} from './pedidoCliente.controller.js'

export const pedidoClienteRouter = Router()

pedidoClienteRouter.get('/:id/pedidos', findAll)

pedidoClienteRouter.get('/pedidos/:nroPed', findOne)

pedidoClienteRouter.post('/:id/pedidos', sanitizePedidoCliente, add) // Crear pedido

pedidoClienteRouter.put('/pedidos/:nroPed', sanitizePedidoCliente, update) // Pagar y finalizar pedido

pedidoClienteRouter.put('/pedidos/:nroPed/cancelar', sanitizePedidoCliente, cancel) // Cancelar pedido

pedidoClienteRouter.delete('/pedidos/:nroPed', remove)
// En realidad lo ideal sería no eliminar ningún pedido, sino cancelarlos.
