import { Request,Response,NextFunction } from "express"
import { Usuario } from "./usuario.entity.js"
import { orm } from "../shared/db/orm.js"
import { validarCliente, validarClientePatch, validarEmpleado, validarEmpleadoPatch } from "./usuarios.schema.js"
import z from 'zod'
import { NotFoundError } from "@mikro-orm/core"

const em = orm.em

function handleErrors(error: any, res: Response) {
  if (error instanceof z.ZodError){
    res.status(400).json({message: JSON.parse(error.message)[0].message})
  } else if (error.name === 'NotFoundError') {
    res.status(404).json({message: 'El usuario no ha sido encontrado'})
  } else if (error.name === 'UniqueConstraintViolationException') {
    res.status(400).json({message: error.sqlMessage})
  } else if(error.message === 'No hay usuarios registrados') {
    res.status(404).json({message: error.message})
  } else {
    res.status(500).json({message: error.message})
  }
}

async function findAllClientes(req:Request, res:Response) {
  try{
    const usuarios = await em.find(Usuario, {tipoUsuario: 'cliente'},)
    if(usuarios.length === 0) {
      throw new Error('No hay usuarios registrados')
    }
    res.status (200).json({message: `Todos los ${usuarios[0].tipoUsuario}s encontrados`, data: usuarios})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function findAllEmpleados(req:Request, res:Response) {
  try{
    const usuarios = await em.find(Usuario, {tipoUsuario: 'empleado'},)
    if(usuarios.length === 0) {
      throw new Error('No hay usuarios registrados')
    }
    res.status (200).json({message: `Todos los ${usuarios[0].tipoUsuario}s encontrados`, data: usuarios})
  } catch (error:any){
    handleErrors(error, res)
  }
}

//Tiene sentido definir un "getOne" por ID para un usuario o un empleado?
// No sería mejor definir uno por email y contraseña?

async function findOneCliente(req:Request,res:Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const usuario = await em.findOneOrFail(Usuario, {id, tipoUsuario: 'cliente'},)
    res.status(200).json({message: 'Cliente encontrado', data: usuario})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function findOneEmpleado(req:Request,res:Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const usuario = await em.findOneOrFail(Usuario, {id, tipoUsuario: 'empleado'},)
    res.status(200).json({message: 'Empleado encontrado', data: usuario})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function addCliente(req:Request,res:Response) {
  try{
    const clienteValido = validarCliente(req.body)
    const cliente = em.create(Usuario, clienteValido)
    await em.flush()
    res.status(201).json({message: 'Cliente creado con éxito', data: cliente})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function addEmpleado(req:Request,res:Response) {
  try{
    const empleadoValido = validarEmpleado(req.body)
    const empleado = em.create(Usuario, empleadoValido)
    await em.flush()
    res.status(201).json({message: 'Empleado creado con éxito', data: empleado})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function updateCliente (req:Request,res:Response){
  try{
    const id = Number.parseInt(req.params.id)
    const clienteToUpdate = await em.findOneOrFail(Usuario, {id})
    let clienteUpdated
    if(req.method === 'PATCH'){
      clienteUpdated = validarClientePatch(req.body)
    } else {
      clienteUpdated = validarCliente(req.body)
    }
    em.assign(clienteToUpdate, clienteUpdated)
    await em.flush()
    res.status(200).json({message: 'Usuario actualizado', data: clienteToUpdate})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function updateEmpleado (req:Request,res:Response){
  try{
    const id = Number.parseInt(req.params.id)
    const empleadoToUpdate = await em.findOneOrFail(Usuario, {id})
    let empleadoUpdated
    if(req.method === 'PATCH'){
      empleadoUpdated = validarEmpleadoPatch(req.body)
    } else {
      empleadoUpdated = validarEmpleado(req.body)
    }
    em.assign(empleadoToUpdate, empleadoUpdated)
    await em.flush()
    res.status(200).json({message: 'Usuario actualizado', data: empleadoToUpdate})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function remove (req:Request,res:Response) {
    try {
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Usuario, {id})
    em.removeAndFlush(cliente)
    res.status(200).json({message: 'El cliente ha sido eliminado con éxito', data: cliente})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

export {findAllClientes, findAllEmpleados, findOneCliente, findOneEmpleado, addCliente, addEmpleado, updateCliente, updateEmpleado, remove}