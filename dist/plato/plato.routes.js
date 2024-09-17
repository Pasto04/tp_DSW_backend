import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./plato.controller.js";
export const platoRouter = Router();
platoRouter.get('/', findAll);
platoRouter.get('/:numPlato', findOne);
platoRouter.post('/', add);
platoRouter.put('/:numPlato', update);
platoRouter.patch('/:numPlato', update);
platoRouter.delete('/:numPlato', remove);
//# sourceMappingURL=plato.routes.js.map