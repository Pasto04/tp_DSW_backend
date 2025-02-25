import { Router } from 'express'
import {findAll, findOne, add, update, remove } from './tipoPlato.controller.js'
import { verificarToken } from '../shared/authMiddleware.js'

export const tipoPlatoRouter = Router()

tipoPlatoRouter.get('/', findAll)
tipoPlatoRouter.get('/:numPlato', findOne)
tipoPlatoRouter.post('/', verificarToken, add)
tipoPlatoRouter.put('/:numPlato', verificarToken, update)
tipoPlatoRouter.patch('/:numPlato', verificarToken, update)
tipoPlatoRouter.delete('/:numPlato', verificarToken, remove)