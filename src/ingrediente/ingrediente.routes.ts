import { findAll, findOne, add, update, remove } from './ingrediente.controller.js'
import { Router } from 'express'

export const ingredienteRouter = Router()

ingredienteRouter.get('/', findAll)
ingredienteRouter.get('/:cod', findOne)
ingredienteRouter.post('/', add)
ingredienteRouter.put('/:cod', update)
ingredienteRouter.patch('/:cod', update)
ingredienteRouter.delete('/:cod', remove)