import { Router } from 'express';
import {
  add,
  findAll,
  findOne,
  remove,
  sanitizePedidoCliente,
  update,
} from './pedidoCliente.controller.js';

export const pedidoClienteRouter = Router();

pedidoClienteRouter.get('/:id/pedidos', findAll);

pedidoClienteRouter.get('/pedidos/:nroPed', findOne);

pedidoClienteRouter.post('/:id/pedidos', sanitizePedidoCliente, add); // Crear pedido

pedidoClienteRouter.put('/pedidos/:nroPed', sanitizePedidoCliente, update); // Pagar y finalizar pedido

pedidoClienteRouter.patch('/pedidos/:nroPed', sanitizePedidoCliente, update); // Agregar plato/s y bebida/s o Cancelar Pedido

pedidoClienteRouter.delete('/pedidos/:nroPed', remove);
// En realidad lo ideal sería no eliminar ningún pedido, sino cancelarlos.
