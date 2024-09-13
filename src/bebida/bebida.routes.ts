import { Router } from "express";
import { findAll, findOne, add, update, remove, /*sanitizeBebida*/ } from './bebida.controller.js'

export const bebidaRouter = Router()

bebidaRouter.get('/', findAll)
bebidaRouter.get('/:codBebida', findOne)
bebidaRouter.post('/', add, /*sanitizeBebida*/)
bebidaRouter.put('/:codBebida', update, /*sanitizeBebida*/)
bebidaRouter.patch('/:codBebida', update, /*sanitizeBebida*/)
bebidaRouter.delete('/:codBebida', remove)