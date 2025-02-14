import { Router } from "express"
import { findAll, findOne, add, sanitizeTarjetaCliente, update, remove } from "./tarjetaCliente.controller.js"

export const tarjetaClienteRouter = Router()

tarjetaClienteRouter.get('/:id/tarjetas',findAll)
tarjetaClienteRouter.get('/:id/tarjetas/:idTarjeta',findOne) 
tarjetaClienteRouter.post('/:id/tarjetas', sanitizeTarjetaCliente, add)
tarjetaClienteRouter.put('/:id/tarjetas/:idTarjeta',sanitizeTarjetaCliente,update) 
tarjetaClienteRouter.patch('/:id/tarjetas/:idTarjeta',sanitizeTarjetaCliente,update) 
tarjetaClienteRouter.delete('/:id/tarjetas/:idTarjeta',remove) 