import { verificarToken } from '../shared/authMiddleware.js'
import { findAll, findOne, add, sanitizeIngrediente, update, remove } from './ingrediente.controller.js'
import { Router } from 'express'

export const ingredienteRouter = Router()

ingredienteRouter.get('/', findAll)
ingredienteRouter.get('/:cod', findOne)
ingredienteRouter.post('/', verificarToken, sanitizeIngrediente, add)
ingredienteRouter.put('/:cod', verificarToken, sanitizeIngrediente, update)
ingredienteRouter.patch('/:cod', verificarToken, sanitizeIngrediente, update)
ingredienteRouter.delete('/:cod', verificarToken, remove)