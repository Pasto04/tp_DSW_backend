import { Request,Response,NextFunction } from "express"
import { Usuario } from "./usuario.entity.js"
import { orm } from "../shared/db/orm.js"

const em = orm.em

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

async function findAll(req:Request,res:Response) {
  try{
    const clientes = await em.find(Usuario, {},)
    res.status (200).json({message: 'Todos los clientes encontrados', data: clientes})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function findOne(req:Request,res:Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Usuario, {id},)
    res.status(200).json({message: 'Usuario encontrado', data: cliente})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function add(req:Request,res:Response) {
  try{
    const cliente = em.create(Usuario, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({message: 'Usuario creado', data:cliente})
  } catch (error:any){
    res.status(500).json({message:error.message})
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
    res.status(500).json({message:error.message})
  }
}

async function remove (req:Request,res:Response) {
    try {
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Usuario, {id})
    em.removeAndFlush(cliente)
    res.status(200).json({message: 'El cliente ha sido eliminado con éxito', data: cliente})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

export {sanitizeUsuarioInput,findAll,findOne,add,update,remove}