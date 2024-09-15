import { Request,Response,NextFunction } from "express"
import { Usuario } from "./usuario.entity.js"
import { orm } from "../shared/db/orm.js"
import { validarCliente, validarEmpleado } from "./usuarios.schema.js"
import z from 'zod'
import { NotFoundError } from "@mikro-orm/core"

const em = orm.em

function handleErrors(error: any, res: Response) {
  if (error instanceof z.ZodError){
    res.status(400).json({message: JSON.parse(error.message)[0].message})
  } else if (error === NotFoundError) {
    res.status(404).json({message: 'El usuario no ha sido encontrado'})
  } else if (error.name === 'UniqueConstraintViolationException') {
    res.status(400).json({message: error.sqlMessage})
  } else {
    res.status(500).json({message: error.message})
  }
}

async function sanitizeUsuarioInput(req:Request, res:Response, next:NextFunction){
  req.body.sanitizedInput = {
    id: req.body.id,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    mail: req.body.mail,
    contrasenia: req.body.contrasenia,
    telefono: req.body.telefono,
  }

  Object.keys(req.body.sanitizedInput).forEach(key => {
    if(req.body.sanitizedInput [key] === undefined){
      delete req.body.sanitizedInput [key]
    }
  })
  next()
}

async function findAll(req:Request, res:Response) {
  try{
    const clientes = await em.find(Usuario, {},)
    res.status (200).json({message: 'Todos los clientes encontrados', data: clientes})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function findOne(req:Request,res:Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Usuario, {id},)
    res.status(200).json({message: 'Usuario encontrado', data: cliente})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function addCliente(req:Request,res:Response) {
  try{
    const clienteValido = validarCliente(req.body.sanitizedInput)
    const cliente = em.create(Usuario, clienteValido)
    await em.flush()
    res.status(201).json({message: 'Cliente creado con éxito', data: cliente})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function addEmpleado(req:Request,res:Response) {
  try{
    const empleadoValido = validarEmpleado(req.body.sanitizedInput)
    const empleado = em.create(Usuario, empleadoValido)
    await em.flush()
    res.status(201).json({message: 'Empleado creado con éxito', data: empleado})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function update (req:Request,res:Response){
  try{
    const id = Number.parseInt(req.params.id)
    const clienteToUpdate = await em.findOneOrFail(Usuario, {id})
    em.assign(clienteToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({message: 'Usuario actualizado', data: clienteToUpdate})
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

export {sanitizeUsuarioInput, findAll, findOne, addCliente, addEmpleado, update, remove}