import { Request,Response,NextFunction } from "express"
import { Usuario } from "./usuario.entity.js"
import { orm } from "../shared/db/orm.js"
import { validarUsuario, validarUsuarioLogIn, validarUsuarioLogInSafe, validarUsuarioPatch, validarUsuarioSafe } from "./usuarios.schema.js"
import { validarFindAll } from "../shared/validarFindAll.js"
import { UsuarioNotFoundError, UsuarioUniqueConstraintViolation } from "../shared/errors/entityErrors/usuario.errors.js"
import { handleErrors } from "../shared/errors/errorHandler.js"

const em = orm.em

async function findAllByTipoUsuario(req:Request, res:Response) {
  try{
    const { tipoUsuario } = req.query
    if(tipoUsuario){
      const tipoUsuario = (req.query.tipoUsuario as string).toLowerCase()
      const usuarios = validarFindAll(await em.find(Usuario, {tipoUsuario}), UsuarioNotFoundError)
      res.status(200).json({message: `Todos los ${tipoUsuario}s encontrados`, data: usuarios})
    } 
  } catch (error:any){
    handleErrors(error, res)
  }
}

//Tiene sentido definir un "getOne" por ID para un usuario?
// No sería mejor definir uno por email y contraseña?

async function findOne(req:Request,res:Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const usuario = await em.findOneOrFail(Usuario, {id},)
    res.status(200).json({message: 'Usuario encontrado', data: usuario})
  } catch (error:any){
    handleErrors(error, res)
  }
}
/* VER VIDEO SOBRE LOG IN PARA VER SI ESTOY ENCAMINADO
async function addUsuarioOrGetByMailYContraseña(req:Request,res:Response) {
  try{
    const validoUsuario = validarUsuarioSafe(req.body)
    const validoLogIn = validarUsuarioLogInSafe(req.body)
    if(validoLogIn.success){
      const logIn = validarUsuarioLogIn(req.body)
      const usuario = await em.findOneOrFail(Usuario, {mail: logIn.mail, contrasenia: logIn.contrasenia})
      res.status(200).json({message: 'Usuario encontrado con éxito', data: usuario})
    } else if (validoUsuario.success){
      const usuarioValido = validarUsuario(req.body)
      const usuario = em.create(Usuario, usuarioValido)
      await em.flush()
      res.status(201).json({message: 'Usuario creado con éxito', data: usuario})
    }
  } catch (error:any){
    handleErrors(error, res)
  }
}
*/

async function addUsuario(req: Request, res: Response){
  try {
    const usuarioValido = validarUsuario(req.body)
    const usuario = em.create(Usuario, usuarioValido)
    await em.flush()
    res.status(201).json({message: 'Usuario creado con éxito', data: usuario})
  } catch (error: any){
    if(error.name === 'UniqueConstraintViolationException') {
      error = new UsuarioUniqueConstraintViolation
    }
    handleErrors(error, res)
  }
}

async function updateUsuario (req:Request,res:Response){
  try{
    const id = Number.parseInt(req.params.id)
    const usuarioToUpdate = await em.findOneOrFail(Usuario, {id})
    let usuarioUpdated
    if(req.method === 'PATCH'){
      usuarioUpdated = validarUsuarioPatch(req.body)
    } else {
      usuarioUpdated = validarUsuario(req.body)
    }
    em.assign(usuarioToUpdate, usuarioUpdated)
    await em.flush()
    res.status(200).json({message: 'Usuario actualizado', data: usuarioToUpdate})
  } catch (error:any){
    if(error.name === 'UniqueConstraintViolationException') {
      error = new UsuarioUniqueConstraintViolation
    }
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

export {findAllByTipoUsuario, findOne, addUsuario, updateUsuario, remove}