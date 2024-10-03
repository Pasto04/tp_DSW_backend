import { Router } from 'express'
import { findAll, findOne, add, update, remove } from './tarjeta.controller.js'

export const tarjetaRouter = Router()

tarjetaRouter.get('/', findAll)
tarjetaRouter.get('/:idTarjeta', findOne)
tarjetaRouter.post('/', add)
tarjetaRouter.put('/:idTarjeta', update)
tarjetaRouter.patch('/:idTarjeta', update)
tarjetaRouter.delete('/:idTarjeta', remove)