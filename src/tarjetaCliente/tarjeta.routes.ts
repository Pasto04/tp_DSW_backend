import { Router } from 'express'
import {findAll, findOne, add, update, remove } from './tarjeta.controller.js'

export const tarjetaRouter = Router()

tarjetaRouter.get('/', findAll)
tarjetaRouter.get('/:nroTarjeta', findOne)
tarjetaRouter.post('/', add)
tarjetaRouter.put('/:nroTarjeta', update)
tarjetaRouter.patch('/:nroTarjeta', update)
tarjetaRouter.delete('/:nroTarjeta', remove)