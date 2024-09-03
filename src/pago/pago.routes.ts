import { Router } from "express";
import { sanitizePagoInput, findAll, findOne, add, update, remove } from "./pago.controller.js";

export const pagoRouter = Router()

pagoRouter.get('/',findAll)
pagoRouter.get('/:idPago',findOne) 
pagoRouter.post('/',sanitizePagoInput,add)
pagoRouter.put('/:idPago',sanitizePagoInput,update) 
pagoRouter.patch('/:idPago',sanitizePagoInput,update) 
pagoRouter.delete('/:idPago',sanitizePagoInput,remove) 