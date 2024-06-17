import { sanitizeIngrediente, findAll, findOne, add, update, remove } from './ingrediente.controler.js';
import { Router } from 'express';
export const ingredienteRouter = Router();
ingredienteRouter.get('/', findAll);
ingredienteRouter.get('/:codIngrediente', findOne);
ingredienteRouter.post('/', sanitizeIngrediente, add);
ingredienteRouter.put('/:codIngrediente', sanitizeIngrediente, update);
ingredienteRouter.patch('/:codIngrediente', sanitizeIngrediente, update);
ingredienteRouter.delete('/:codIngrediente', remove);
//# sourceMappingURL=ingrediente.routes.js.map