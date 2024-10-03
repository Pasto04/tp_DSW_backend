import { Router } from "express";
import { findAll, findOne, add, update, remove } from "./mesa.controller.js";

export const mesaRouter = Router()

mesaRouter.get('/',findAll)
mesaRouter.get('/:nroMesa',findOne) 
mesaRouter.post('/',add)
mesaRouter.put('/:nroMesa',update) 
mesaRouter.patch('/:nroMesa',update) 
mesaRouter.delete('/:nroMesa',remove) 