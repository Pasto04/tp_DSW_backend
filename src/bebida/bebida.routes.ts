import { Router } from "express"
import { findAll, findOne, add, update, remove, sanitizeBebida} from './bebida.controller.js'

export const bebidaRouter = Router()

bebidaRouter.get('/', findAll)
bebidaRouter.get('/:codBebida', findOne)
bebidaRouter.post('/', sanitizeBebida, add)
bebidaRouter.put('/:codBebida', sanitizeBebida, update )
bebidaRouter.patch('/:codBebida', sanitizeBebida, update )
bebidaRouter.delete('/:codBebida', remove)