import { Router } from "express";
import { sanitizePagoInput, findOne, add, remove } from "./pago.controller.js";

export const PedidoPagoRouter = Router()

PedidoPagoRouter.get('/:nroPed/pagos', findOne) 
PedidoPagoRouter.post('/:nroPed/pagos', sanitizePagoInput, add)
PedidoPagoRouter.delete('/:nroPed/pagos', remove) 