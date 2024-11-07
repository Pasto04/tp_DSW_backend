import { Router } from 'express';
import {
  add,
  remove,
  update,
  sanitizePlatoPedido,
} from './platoPedido.controller.js';

export const platoPedidoRouter = Router();

platoPedidoRouter.post('/:nroPed/platos', sanitizePlatoPedido, add);

platoPedidoRouter.put('/:nroPed/platos/:nro', sanitizePlatoPedido, update);

platoPedidoRouter.delete(
  '/:nroPed/platos/:nro/fecha/:fecha/hora/:hora',
  remove
);
