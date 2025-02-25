import { Router } from "express"
import { sanitizePagoInput, findOne, add, remove } from "./pago.controller.js"
import { verificarToken } from "../../shared/authMiddleware.js"

export const PedidoPagoRouter = Router()

PedidoPagoRouter.get('/:nroPed/pagos', verificarToken, findOne) 
PedidoPagoRouter.post('/:nroPed/pagos', verificarToken, sanitizePagoInput, add)
PedidoPagoRouter.delete('/:nroPed/pagos', verificarToken, remove) 