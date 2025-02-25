import { Router } from "express"
import { findAll, findOne, add, update, remove, sanitizeBebida} from './bebida.controller.js'
import { verificarToken } from "../shared/authMiddleware.js"

export const bebidaRouter = Router()

bebidaRouter.get('/', findAll)
bebidaRouter.get('/:codBebida', findOne)
bebidaRouter.post('/', verificarToken, sanitizeBebida, add)
bebidaRouter.put('/:codBebida', verificarToken, sanitizeBebida, update )
bebidaRouter.patch('/:codBebida', verificarToken, sanitizeBebida, update )
bebidaRouter.delete('/:codBebida', verificarToken, remove)