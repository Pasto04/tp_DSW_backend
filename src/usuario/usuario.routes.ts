import { Router } from "express";
import { sanitizeUsuarioInput, findAll, findOne, update, remove, addEmpleado, addCliente } from "./usuario.controller.js";

export const usuarioRouter = Router()

usuarioRouter.get('/',findAll)
usuarioRouter.get('/:id',findOne) 
usuarioRouter.post('/', sanitizeUsuarioInput, addCliente)
usuarioRouter.post('/', sanitizeUsuarioInput, addEmpleado)
usuarioRouter.put('/:id',sanitizeUsuarioInput,update) 
usuarioRouter.patch('/:id',sanitizeUsuarioInput,update) 
usuarioRouter.delete('/:id',sanitizeUsuarioInput,remove) 