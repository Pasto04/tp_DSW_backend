import { Router } from 'express';
import { sanitizeElaboracionPlato, findAll, findOne, add, update, remove } from './elaboracionPlato.controller.js';
import { addElabIngre, findAllElabIngre, sanitizeElabIngre, updateElabIngre } from './elaboracionIngrediente.controller.js';
export const elabPlatoRouter = Router();
elabPlatoRouter.get('/:nro/ingredientes', findAll);
elabPlatoRouter.get('/:nro/ingredientes/:cod', findOne);
elabPlatoRouter.post('/:nro/ingredientes', sanitizeElaboracionPlato, add);
elabPlatoRouter.patch('/:nro/ingredientes/:cod', sanitizeElaboracionPlato, update);
elabPlatoRouter.delete('/:nro/ingredientes/:cod', remove);
export const elabIngredienteRouter = Router();
elabIngredienteRouter.get('/:cod/platos', findAllElabIngre);
elabIngredienteRouter.get('/:cod/platos/:nro', findOne);
elabIngredienteRouter.post('/:cod/platos', sanitizeElabIngre, addElabIngre);
elabIngredienteRouter.patch('/:cod/platos/:nro', sanitizeElabIngre, updateElabIngre);
elabIngredienteRouter.delete('/:cod/platos/:nro', remove);
//# sourceMappingURL=elaboracionPlato.routes.js.map