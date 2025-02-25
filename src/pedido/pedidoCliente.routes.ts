import { Router } from 'express'
import { add, findAll, findOne, remove, sanitizePedidoCliente, update, cancel} from './pedidoCliente.controller.js'
import { verificarToken } from '../shared/authMiddleware.js'

export const pedidoClienteRouter = Router()

pedidoClienteRouter.get('/:id/pedidos', verificarToken, findAll)

pedidoClienteRouter.get('/pedidos/:nroPed', verificarToken, findOne)

pedidoClienteRouter.post('/:id/pedidos', verificarToken, sanitizePedidoCliente, add) // Crear pedido

pedidoClienteRouter.put('/pedidos/:nroPed', verificarToken, sanitizePedidoCliente, update) // Pagar y finalizar pedido

pedidoClienteRouter.put('/pedidos/:nroPed/cancelar', verificarToken, sanitizePedidoCliente, cancel) // Cancelar pedido

pedidoClienteRouter.delete('/pedidos/:nroPed', verificarToken, remove)
// En realidad lo ideal sería no eliminar ningún pedido, sino cancelarlos.
