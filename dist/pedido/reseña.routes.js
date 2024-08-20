import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './reseña.controler.js';
export const reseñaRouter = Router();
reseñaRouter.get('/pedidos/reseña', findAll);
reseñaRouter.get('/pedidos/reseña/:nroPed', findOne);
reseñaRouter.post('/pedidos/reseña', add);
reseñaRouter.put('/pedidos/reseña/:nroPed', update);
reseñaRouter.patch('/pedidos/reseña/:nroPed', update);
reseñaRouter.delete('/pedidos/reseña/:nroPed', remove);
//# sourceMappingURL=rese%C3%B1a.routes.js.map