import { sanitizeIngrediente, findAll, findOne, add, update, remove } from './ingrediente.controler.js'
import { Router } from 'express'

export const ingredienteRouter = Router()

ingredienteRouter.get('/', findAll)
ingredienteRouter.get('/:cod', findOne)
ingredienteRouter.post('/', sanitizeIngrediente, add)
ingredienteRouter.put('/:cod', sanitizeIngrediente, update)
ingredienteRouter.patch('/:cod', sanitizeIngrediente, update)
ingredienteRouter.delete('/:cod', remove)