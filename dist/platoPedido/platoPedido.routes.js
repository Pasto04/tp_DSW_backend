import { Router } from 'express';
import { sanitizePlatoPedido, findAll, remove, update, add } from './platoPedido.controller.js';
import { findOne } from './platoPedido.controller.js';
export const platoPlatoRouter = Router();
export const platoPedidoRouter = Router();
platoPedidoRouter.get('/:nroPed/platos', findAll);
platoPedidoRouter.get('/:nroPed/platos/:nro', findOne);
platoPedidoRouter.post('/:nroPed/platos', /*(req, res)=> {console.log(JSON.stringify(req))},*/ sanitizePlatoPedido, add);
platoPedidoRouter.patch('/:nroPed/platos/:nro', sanitizePlatoPedido, update);
platoPedidoRouter.delete('/:nroPed/platos/:nro', remove);
//# sourceMappingURL=platoPedido.routes.js.map