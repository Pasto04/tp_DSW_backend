import { Router } from "express";
import { sanitizeTarjetaClienteInput, findAll, findOne, add, update, remove } from "./tarjetaCliente.controller.js";

export const tarjetaClienteRouter = Router()

tarjetaClienteRouter.get('/',findAll)
tarjetaClienteRouter.get('/:nroTarjeta',findOne) 
tarjetaClienteRouter.post('/',sanitizeTarjetaClienteInput,add)
tarjetaClienteRouter.put('/:nroTarjeta',sanitizeTarjetaClienteInput,update) 
tarjetaClienteRouter.patch('/:nroTarjeta',sanitizeTarjetaClienteInput,update) 
tarjetaClienteRouter.delete('/:nroTarjeta',sanitizeTarjetaClienteInput,remove) 