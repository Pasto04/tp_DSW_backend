import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './elaboracionPlato.controller.js';
export const elabPlatoRouter = Router();
elabPlatoRouter.get('/:nro/ingredientes', findAll);
elabPlatoRouter.get('/:nro/ingredientes/:cod', findOne);
elabPlatoRouter.post('/:nro/ingredientes', add);
elabPlatoRouter.patch('/:nro/ingredientes/:cod', update);
elabPlatoRouter.delete('/:nro/ingredientes/:cod', remove);
//# sourceMappingURL=elaboracionPlato.routes.js.map