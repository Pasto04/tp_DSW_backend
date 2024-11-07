import { Router } from 'express';
import {
  sanitizeBebidaPedido,
  add,
  update,
  remove,
} from './bebidaPedido.controller.js';

export const bebidaPedidoRouter = Router();

bebidaPedidoRouter.post('/:nroPed/bebidas', sanitizeBebidaPedido, add);
bebidaPedidoRouter.put(
  '/:nroPed/bebidas/:codBebida',
  sanitizeBebidaPedido,
  update
);
bebidaPedidoRouter.delete(
  '/:nroPed/bebidas/:codBebida/fecha/:fecha/hora/:hora',
  remove
);
