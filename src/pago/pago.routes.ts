import { Router } from "express";
import { sanitizePagoInput, findAll, findOne, add, update, remove } from "./pago.controller.js";

export const clientePedidoPagoRouter = Router()

clientePedidoPagoRouter.get('/:id/pedidos/:nroPed/pagos', findOne) 
clientePedidoPagoRouter.post('/:id/pedidos/:nroPed/pagos', sanitizePagoInput, add)
clientePedidoPagoRouter.put('/:id/pedidos/:nroPed/pagos', sanitizePagoInput, update) 
clientePedidoPagoRouter.patch('/:id/pedidos/:nroPed/pagos', sanitizePagoInput, update) 
clientePedidoPagoRouter.delete('/:id/pedidos/:nroPed/pagos', remove) 

export const clientePagoRouter = Router()

clientePagoRouter.get('/:id/pagos', findAll)