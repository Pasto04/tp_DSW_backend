import { Router } from 'express';
import { sanitizePlatoPedido, findAll, remove, update, add } from './platoPedido.controller.js';
import { findOne } from './platoPedido.controller.js';
export const platoPlatoRouter = Router();
export const platoPedRouter = Router();
platoPedRouter.get('/:nroPed/platos', findAll);
platoPedRouter.get('/:nroPed/platos/:nro', findOne);
platoPedRouter.post('/:nroPed/platos', /*(req, res)=> {console.log(JSON.stringify(req))},*/ sanitizePlatoPedido, add);
platoPedRouter.patch('/:nroPed/platos/:nro', sanitizePlatoPedido, update);
platoPedRouter.delete('/:nroPed/platos/:nro', remove);
//# sourceMappingURL=platoPedido.routes.js.map