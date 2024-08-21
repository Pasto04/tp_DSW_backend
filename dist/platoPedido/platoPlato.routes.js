import { Router } from "express";
import { findAll, sanitizePlatoPedido, add, findOne, remove, update } from "./platoPedido.controller.js";
export const platoPlatoRouter = Router();
platoPlatoRouter.get('/:cod/platos', findAll);
platoPlatoRouter.get('/:cod/platos/:nro', findOne);
platoPlatoRouter.post('/:cod/platos', sanitizePlatoPedido, add);
platoPlatoRouter.patch('/:cod/platos/:nro', sanitizePlatoPedido, update);
platoPlatoRouter.delete('/:cod/platos/:nro', remove);
//# sourceMappingURL=platoPlato.routes.js.map