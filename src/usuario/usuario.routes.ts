import { Router } from "express";
import { findAllByTipoUsuario, findOne, updateUsuario, remove, addUsuario, sanitizeUsuario, sanitizeLogIn, logInUsuario, logOutUsuario } from "./usuario.controller.js"; 

export const usuarioRouter = Router()

usuarioRouter.get('/', findAllByTipoUsuario) //Sólo para empleados
usuarioRouter.get('/:id', findOne) 
usuarioRouter.post('/registro', sanitizeUsuario, addUsuario)
usuarioRouter.post('/login', sanitizeLogIn, logInUsuario)
usuarioRouter.post('/logout', logOutUsuario)
usuarioRouter.put('/:id', updateUsuario) 
usuarioRouter.patch('/:id', updateUsuario)
usuarioRouter.delete('/:id', remove) 