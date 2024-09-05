import { Router } from "express";
import { sanitizeMesaInput, findAll, findOne, add, update, remove } from "./mesa.controller.js";

export const mesaRouter = Router()

mesaRouter.get('/',findAll)
mesaRouter.get('/:nroMesa',findOne) 
mesaRouter.post('/',sanitizeMesaInput,add)
mesaRouter.put('/:nroMesa',sanitizeMesaInput,update) 
mesaRouter.patch('/:nroMesa',sanitizeMesaInput,update) 
mesaRouter.delete('/:nroMesa',sanitizeMesaInput,remove) 