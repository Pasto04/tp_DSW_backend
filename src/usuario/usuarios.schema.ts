import { z } from "zod";
import { Pedido } from "../pedido/pedido.entity.js";
import { TarjetaCliente } from "../tarjetaCliente/tarjetaCliente.entity.js";
import { UsuarioWrongRole } from "../shared/errors/entityErrors/usuario.errors.js";

const roles = ['cliente', 'empleado']

const isIn = z.function().args(z.string(), z.array(z.string())).implement((a, b) => {
  if(b.find((e) => e.toLowerCase() === a.toLowerCase())){
    return true
  }
})

const usuarioSchema = z.object({
  id: z.number().int().positive().optional(),
  email: z.string({invalid_type_error: 'El email debe ser un string', required_error: 'El email es requerido'})
        .min(5, {message: 'La contraseña debe tener al menos 6 caracteres'})
        .email({message: 'El email debe ser válido'}),
  contrasenia: z.string({required_error: 'La contraseña es requerida', invalid_type_error: 'La contraseña debe ser un string'}),
  nombre: z.string({required_error: 'El nombre es requerido', invalid_type_error: 'El nombre debe ser un string'}),
  apellido: z.string({required_error: 'El apellido es requerido', invalid_type_error: 'El apellido debe ser un string'}),
  telefono: z.string({invalid_type_error: 'El telefono debe ser un string'}).optional(),
  tipoUsuario: z.string({required_error: 'El tipo de usuario es requerido', 
    invalid_type_error: 'El tipo de usuario debe ser un string'}),
  pedidos: z.array(z.instanceof(Pedido)).optional(),
  tarjetasCliente: z.array(z.instanceof(TarjetaCliente)).optional()
})

const usuarioToPatchSchema = z.object({
  email: z.string({invalid_type_error: 'El email debe ser un string'})
        .email({message: 'El email debe ser válido'}).optional(),
  contrasenia: z.string({invalid_type_error: 'La contraseña debe ser un string'})
               .min(5, {message: 'La contraseña debe tener al menos 6 caracteres'})
               .optional(),
  nombre: z.string({invalid_type_error: 'El nombre debe ser un string'}).optional(),
  apellido: z.string({invalid_type_error: 'El apellido debe ser un string'}).optional(),
  telefono: z.string({invalid_type_error: 'El telefono debe ser un string'}).optional(),
  tipoUsuario: z.string({required_error: 'El tipo de usuario es requerido', invalid_type_error: 'El tipo de usuario debe ser un string'}).optional(),
  pedidos: z.array(z.instanceof(Pedido)).optional(),
  tarjetasCliente: z.array(z.instanceof(TarjetaCliente)).optional()
})

const usuarioToLogIn = z.object({
  email: z.string({required_error: 'El email es requerido', invalid_type_error: 'El email debe ser un string'})
        .email({message: 'El email debe ser válido'}),
  contrasenia: z.string({required_error: 'La contraseña es requerida', invalid_type_error: 'La contraseña debe ser un string'})
               .min(5, {message: 'La contraseña debe tener al menos 6 caracteres'})
})

function validarUsuario(object: any) {
  try {
      const result = isIn(object.tipoUsuario, roles)
      if(result) {
        const usuario = usuarioSchema.parse(object)
        usuario.email = usuario.email.toLowerCase()
        usuario.tipoUsuario = usuario.tipoUsuario.toLowerCase()
        return usuario
      } else {
        throw new UsuarioWrongRole
      }
  } catch(error: any) {
    throw error
  }
}

function validarUsuarioPatch(object: any) {
  try {
    if(object.tipoUsuario) {
      const result = isIn(object.tipoUsuario, roles)
      if(result) {
        const usuario = usuarioToPatchSchema.parse(object)
        if(usuario.email) usuario.email = usuario.email.toLowerCase()
        if(usuario.tipoUsuario) usuario.tipoUsuario = usuario.tipoUsuario.toLowerCase()
        return usuario
      } else {
        throw new UsuarioWrongRole
      }
    } else {
      const usuario = usuarioToPatchSchema.parse(object)
      if(usuario.email) usuario.email = usuario.email.toLowerCase()
      if(usuario.tipoUsuario) usuario.tipoUsuario = usuario.tipoUsuario.toLowerCase()
      return usuario
    }
  } catch(error: any) {
    throw error
  }
}

function validarUsuarioLogIn(object: any) {
  try {
    return usuarioToLogIn.parse(object)
  } catch (error: any) {
    throw error
  }
}

export { validarUsuario, validarUsuarioPatch, validarUsuarioLogIn }