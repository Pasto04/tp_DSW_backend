import { Router } from 'express'
import { sanitizeTipoIngrediente, findAll, findOne, add, update } from './tipo-ingrediente.controler.js'

export const tipoIngredienteRouter = Router()

tipoIngredienteRouter.get('/', findAll)
tipoIngredienteRouter.get('/:cod', findOne)
tipoIngredienteRouter.post('/', sanitizeTipoIngrediente, add)
tipoIngredienteRouter.put('/:cod', sanitizeTipoIngrediente, update)


//Incorporar métodos "patch" y "delete"