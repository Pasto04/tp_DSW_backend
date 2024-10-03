import { z } from "zod";
import { Pedido } from "../pedido/pedido.entity.js";
import { TarjetaCliente } from "../tarjetaCliente/tarjetaCliente.entity.js";

const usuarioSchema = z.object({
  id: z.number().int().positive().optional(),
  mail: z.string({invalid_type_error: 'El mail debe ser un string', required_error: 'El mail es requerido'})
        .min(6, {message: 'La contraseña debe tener al menos 6 caracteres'})
        .email({message: 'El mail debe ser válido'}),
  contrasenia: z.string({required_error: 'La contraseña es requerida', invalid_type_error: 'La contraseña debe ser un string'}),
  nombre: z.string({required_error: 'El nombre es requerido', invalid_type_error: 'El nombre debe ser un string'}),
  apellido: z.string({required_error: 'El apellido es requerido', invalid_type_error: 'El apellido debe ser un string'}),
  telefono: z.string({invalid_type_error: 'El telefono debe ser un string'}).optional(),
  tipoUsuario: z.string(z.enum(['cliente', 'empleado'], {message: 'El tipo de usuario debe ser "cliente" o "empleado"'})),
  pedidos: z.array(z.instanceof(Pedido)).optional(),
  tarjetasCliente: z.array(z.instanceof(TarjetaCliente)).optional()
})

const usuarioToPatchSchema = z.object({
  mail: z.string({invalid_type_error: 'El mail debe ser un string'})
        .email({message: 'El mail debe ser válido'}).optional(),
  contrasenia: z.string({invalid_type_error: 'La contraseña debe ser un string'})
               .min(6, {message: 'La contraseña debe tener al menos 6 caracteres'})
               .optional(),
  nombre: z.string({invalid_type_error: 'El nombre debe ser un string'}).optional(),
  apellido: z.string({invalid_type_error: 'El apellido debe ser un string'}).optional(),
  telefono: z.string({invalid_type_error: 'El telefono debe ser un string'}).optional(),
  tipoUsuario: z.string(z.enum(['cliente', 'empleado'], {message: 'El tipo de usuario debe ser "cliente" o "empleado"'})).optional(),
  pedidos: z.array(z.instanceof(Pedido)).optional(),
  tarjetasCliente: z.array(z.instanceof(TarjetaCliente)).optional()
})

const usuarioToLogIn = z.object({
  mail: z.string({required_error: 'El mail es requerido', invalid_type_error: 'El mail debe ser un string'})
        .email({message: 'El mail debe ser válido'}),
  contrasenia: z.string({required_error: 'La contraseña es requerida', invalid_type_error: 'La contraseña debe ser un string'})
               .min(6, {message: 'La contraseña debe tener al menos 6 caracteres'})
})

function validarUsuario(object: any) {
  try {
    return usuarioSchema.parse(object)
  } catch(error: any) {
    throw error
  }
}

function validarUsuarioSafe(object: any) {
  try {
    return usuarioSchema.safeParse(object)
  } catch(error: any) {
    throw error
  }
}

function validarUsuarioPatch(object: any) {
  try {
    return usuarioToPatchSchema.parse(object)
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

function validarUsuarioLogInSafe(object: any) {
  try {
    return usuarioToLogIn.safeParse(object)
  } catch (error: any) {
    throw error
  }
}

export { validarUsuario, validarUsuarioSafe, validarUsuarioPatch, validarUsuarioLogIn, validarUsuarioLogInSafe }