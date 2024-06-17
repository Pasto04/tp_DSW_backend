import { Router } from 'express';
import { sanitizeTipoIngrediente, findAll, findOne, add, update, remove } from './tipo-ingrediente.controler.js';
export const tipoIngredienteRouter = Router();
tipoIngredienteRouter.get('/', findAll);
tipoIngredienteRouter.get('/:cod', findOne);
tipoIngredienteRouter.post('/', sanitizeTipoIngrediente, add);
tipoIngredienteRouter.put('/:cod', sanitizeTipoIngrediente, update);
tipoIngredienteRouter.patch('/:cod', sanitizeTipoIngrediente, update);
tipoIngredienteRouter.delete('/:cod', remove);
//# sourceMappingURL=tipo-ingrediente.routes.js.map