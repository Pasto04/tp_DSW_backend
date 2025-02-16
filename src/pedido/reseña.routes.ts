import { Router } from 'express'
import { findAll, findOne, add, update, remove, sanitizeResena } from './reseña.controller.js'

export const resenaRouter = Router()

resenaRouter.get('/', findAll)

export const getResenaRouter = Router()

getResenaRouter.get('/:nroPed/resena', findOne)


export const pedidoResenaRouter = Router()

pedidoResenaRouter.post('/:id/pedidos/:nroPed/resena', sanitizeResena, add)
pedidoResenaRouter.put('/:id/pedidos/:nroPed/resena', sanitizeResena, update) // Funciona correctamente
pedidoResenaRouter.delete('/:id/pedidos/:nroPed/resena', remove)