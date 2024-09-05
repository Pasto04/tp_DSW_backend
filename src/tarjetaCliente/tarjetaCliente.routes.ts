import { Router } from "express";
import { sanitizeTarjetaClienteInput, findAll, findOne, add, update, remove } from "./tarjetaCliente.controller.js";

export const tarjetaClienteRouter = Router()

tarjetaClienteRouter.get('/:id/tarjetas',findAll)
tarjetaClienteRouter.get('/:id/tarjetas/:idTarjeta',findOne) 
tarjetaClienteRouter.post('/:id/tarjetas',sanitizeTarjetaClienteInput,add)
tarjetaClienteRouter.put('/:id/tarjetas/:idTarjeta',sanitizeTarjetaClienteInput,update) 
tarjetaClienteRouter.patch('/:id/tarjetas/:idTarjeta',sanitizeTarjetaClienteInput,update) 
tarjetaClienteRouter.delete('/:id/tarjetas/:idTarjeta',sanitizeTarjetaClienteInput,remove) 