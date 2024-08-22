import { Router } from "express";
import { findAll, sanitizeElaboracionIngrediente, add, remove, update } from "./elaboracionIngrediente.controller.js";
import { findOne } from './elaboracionPlato.controller.js';
export const elabIngredienteRouter = Router();
elabIngredienteRouter.get('/:cod/platos', findAll);
elabIngredienteRouter.get('/:cod/platos/:nro', findOne);
elabIngredienteRouter.post('/:cod/platos', sanitizeElaboracionIngrediente, add);
elabIngredienteRouter.patch('/:cod/platos/:nro', sanitizeElaboracionIngrediente, update);
elabIngredienteRouter.delete('/:cod/platos/:nro', remove);
//# sourceMappingURL=elaboracionIngrediente.routes.js.map