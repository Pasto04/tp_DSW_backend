import { Router } from "express";
import { findAll, findOne, add, update, remove } from './bebida.controller.js'

export const bebidaRouter = Router()

bebidaRouter.get('/', findAll)
bebidaRouter.get('/:codBebida', findOne)
bebidaRouter.post('/', add)
bebidaRouter.put('/:codBebida', update)
bebidaRouter.patch('/:codBebida', update)
bebidaRouter.delete('/:codBebida', remove)