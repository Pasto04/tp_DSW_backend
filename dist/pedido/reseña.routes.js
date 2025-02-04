import { Router } from 'express';
import { findAll, findOne, add, update, remove, sanitizeResena } from './reseña.controller.js';
export const resenaRouter = Router();
resenaRouter.get('/', findAll);
export const pedidoResenaRouter = Router();
pedidoResenaRouter.get('/:nroPed/resena', findOne);
pedidoResenaRouter.post('/:nroPed/resena', sanitizeResena, add);
pedidoResenaRouter.put('/:nroPed/resena', sanitizeResena, update); // Funciona correctamente
//pedidoResenaRouter.patch('/:nroPed/resena', sanitizeResena, update) PATCH tiene problemas debido a que el atributo "puntaje" es requerido (por resolver)
pedidoResenaRouter.delete('/:nroPed/resena', remove);
//# sourceMappingURL=rese%C3%B1a.routes.js.map