import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./mesa.controller.js";
import { verificarToken } from "../shared/authMiddleware.js";

export const mesaRouter = Router()

mesaRouter.get('/', verificarToken, findAll)
mesaRouter.get('/:nroMesa', verificarToken, findOne) 
mesaRouter.post('/', verificarToken, add)
mesaRouter.put('/:nroMesa', verificarToken, update) 
mesaRouter.patch('/:nroMesa', verificarToken, update) 
mesaRouter.delete('/:nroMesa', verificarToken, remove) 