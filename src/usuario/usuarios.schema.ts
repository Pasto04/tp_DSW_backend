import { z } from "zod";


const clienteSchema = z.object({
  id: z.number().int().positive().optional(),
  nombre: z.string({required_error: 'El nombre es requerido', invalid_type_error: 'El nombre debe ser un string'}),
  apellido: z.string({required_error: 'El apellido es requerido', invalid_type_error: 'El apellido debe ser un string'}),
  mail: z.string({invalid_type_error: 'El mail debe ser un string', required_error: 'El mail es requerido'})
        .email({message: 'El mail debe ser válido'}),
  contrasenia: z.string({required_error: 'La contraseña es requerida', invalid_type_error: 'La contraseña debe ser un string'}),
  telefono: z.string({invalid_type_error: 'El telefono debe ser un string'})
            .optional(),
  tipoUsuario: z.string({
    required_error: 'El tipo de usuario es requerido', 
    invalid_type_error: 'El tipo de usuario debe ser un string'})
    .includes('cliente')
})

const empleadoSchema = z.object({
  id: z.number().int().positive().optional(),
  nombre: z.string({required_error: 'El nombre es requerido', invalid_type_error: 'El nombre debe ser un string'}),
  apellido: z.string({required_error: 'El apellido es requerido', invalid_type_error: 'El apellido debe ser un string'}),
  mail: z.string({invalid_type_error: 'El mail debe ser un string', required_error: 'El mail es requerido'})
        .email({message: 'El mail debe ser válido'}),
  contrasenia: z.string({required_error: 'La contraseña es requerida', invalid_type_error: 'La contraseña debe ser un string'}),
  telefono: z.string({invalid_type_error: 'El telefono debe ser un string'})
            .optional(),
  tipoUsuario: z.string({
    required_error: 'El tipo de usuario es requerido', 
    invalid_type_error: 'El tipo de usuario debe ser un string'})
    .includes('empleado')
})

export function validarCliente(object: any) {
  try {
    return clienteSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

export function validarEmpleado(object: any) {
  try {
    return empleadoSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}