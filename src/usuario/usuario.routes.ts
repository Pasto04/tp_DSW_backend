import { Router } from "express";
import { sanitizeUsuarioInput,findAll,findOne,add,update,remove } from "./usuario.controller.js";

export const clienteRouter = Router()

clienteRouter.get('/',findAll)
clienteRouter.get('/:id',findOne) 
clienteRouter.post('/',sanitizeUsuarioInput,add)
clienteRouter.put('/:id',sanitizeUsuarioInput,update) 
clienteRouter.patch('/:id',sanitizeUsuarioInput,update) 
clienteRouter.delete('/:id',sanitizeUsuarioInput,remove) 