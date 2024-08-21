import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './reseña.controller.js';
export const reseñaRouter = Router();
reseñaRouter.get('/', findAll);
export const pedidoReseñaRouter = Router();
pedidoReseñaRouter.get('/:nroPed/reseña', findOne);
pedidoReseñaRouter.post('/:nroPed/reseña', add);
pedidoReseñaRouter.put('/:nroPed/reseña', update);
pedidoReseñaRouter.patch('/:nroPed/reseña', update);
pedidoReseñaRouter.delete('/:nroPed/reseña', remove);
//# sourceMappingURL=rese%C3%B1a.routes.js.map