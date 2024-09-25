import { Router } from "express";
import { findAll, findOne /*, add, update, remove*/ } from "./pedido.controller.js";
export const pedidoRouter = Router();
pedidoRouter.get('/', findAll);
pedidoRouter.get('/:nroPed', findOne);
/*pedidoRouter.post('/',sanitizePedidoInput,add)
pedidoRouter.put('/:nroPed',sanitizePedidoInput,update)
pedidoRouter.patch('/:nroPed',sanitizePedidoInput,update)
pedidoRouter.delete('/:nroPed',sanitizePedidoInput,remove)*/ 
//# sourceMappingURL=pedido.routes.js.map