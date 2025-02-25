import { Router } from "express"
import { findAll, findOne, add, sanitizeTarjetaCliente, update, remove } from "./tarjetaCliente.controller.js"
import { verificarToken } from "../shared/authMiddleware.js"

export const tarjetaClienteRouter = Router()

tarjetaClienteRouter.get('/:id/tarjetas', verificarToken, findAll)
tarjetaClienteRouter.get('/:id/tarjetas/:idTarjeta', verificarToken, findOne) 
tarjetaClienteRouter.post('/:id/tarjetas', verificarToken, sanitizeTarjetaCliente, add)
tarjetaClienteRouter.put('/:id/tarjetas/:idTarjeta', verificarToken, sanitizeTarjetaCliente,update) 
tarjetaClienteRouter.delete('/:id/tarjetas/:idTarjeta', verificarToken, remove) 