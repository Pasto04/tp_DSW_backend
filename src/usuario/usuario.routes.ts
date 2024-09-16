import { Router } from "express";
import { findAllByTipoUsuario, findOne, updateUsuario, remove, addUsuario } from "./usuario.controller.js"; 

export const usuarioRouter = Router()

usuarioRouter.get('/', findAllByTipoUsuario)
usuarioRouter.get('/:id', findOne) 
usuarioRouter.post('/', addUsuario)
usuarioRouter.put('/:id', updateUsuario) 
usuarioRouter.patch('/:id', updateUsuario)
usuarioRouter.delete('/:id', remove) 