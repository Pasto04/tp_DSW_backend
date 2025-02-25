import { Router } from 'express'
import { findAll, findOne, add, update, remove } from './tarjeta.controller.js'
import { verificarToken } from '../shared/authMiddleware.js'

export const tarjetaRouter = Router()

tarjetaRouter.get('/', verificarToken, findAll)
tarjetaRouter.get('/:idTarjeta', verificarToken, findOne)
tarjetaRouter.post('/', verificarToken, add)
tarjetaRouter.put('/:idTarjeta', verificarToken, update)
tarjetaRouter.patch('/:idTarjeta', verificarToken, update)
tarjetaRouter.delete('/:idTarjeta', verificarToken, remove)