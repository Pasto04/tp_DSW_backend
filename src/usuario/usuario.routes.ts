import { Router } from "express";
import { findAllClientes, findAllEmpleados, findOneCliente, findOneEmpleado, updateCliente, updateEmpleado, remove, addEmpleado, addCliente } from "./usuario.controller.js";

export const clienteRouter = Router()

clienteRouter.get('/', findAllClientes)
//Tiene sentido definir un "getOne" por ID para un usuario o un empleado?
// No sería mejor definir uno por email y contraseña?
clienteRouter.get('/:id', findOneCliente) 
clienteRouter.post('/', addCliente)
clienteRouter.put('/:id', updateCliente) 
clienteRouter.patch('/:id', updateCliente)
clienteRouter.delete('/:id', remove)

export const empleadoRouter = Router()

empleadoRouter.get('/', findAllEmpleados)
//Tiene sentido definir un "getOne" por ID para un usuario o un empleado?
// No sería mejor definir uno por email y contraseña?
empleadoRouter.get('/:id', findOneEmpleado) 
empleadoRouter.post('/', addEmpleado)
empleadoRouter.put('/:id', updateEmpleado) 
empleadoRouter.patch('/:id', updateEmpleado) 
empleadoRouter.delete('/:id', remove) 