import { z } from "zod";
import { Pedido } from "../pedido/pedido.entity.js";
import { TarjetaCliente } from "../tarjetaCliente/tarjetaCliente.entity.js";


const clienteSchema = z.object({
  id: z.number().int().positive().optional(),
  nombre: z.string({required_error: 'El nombre es requerido', invalid_type_error: 'El nombre debe ser un string'}),
  apellido: z.string({required_error: 'El apellido es requerido', invalid_type_error: 'El apellido debe ser un string'}),
  mail: z.string({invalid_type_error: 'El mail debe ser un string', required_error: 'El mail es requerido'})
        .email({message: 'El mail debe ser válido'}),
  contrasenia: z.string({required_error: 'La contraseña es requerida', invalid_type_error: 'La contraseña debe ser un string'}),
  telefono: z.string({invalid_type_error: 'El telefono debe ser un string'}).optional(),
  tipoUsuario: z.string({
                 required_error: 'El tipo de usuario es requerido', 
                 invalid_type_error: 'El tipo de usuario debe ser un string'
               })
               .includes('cliente', {message: 'El usuario debe ser un cliente'}),
  pedidos: z.array(z.instanceof(Pedido)).optional(),
  tarjetasCliente: z.array(z.instanceof(TarjetaCliente)).optional()
})

const empleadoSchema = z.object({
  id: z.number().int().positive().optional(),
  nombre: z.string({required_error: 'El nombre es requerido', invalid_type_error: 'El nombre debe ser un string'}),
  apellido: z.string({required_error: 'El apellido es requerido', invalid_type_error: 'El apellido debe ser un string'}),
  mail: z.string({invalid_type_error: 'El mail debe ser un string', required_error: 'El mail es requerido'})
        .email({message: 'El mail debe ser válido'}),
  contrasenia: z.string({required_error: 'La contraseña es requerida', invalid_type_error: 'La contraseña debe ser un string'}),
  telefono: z.string({invalid_type_error: 'El telefono debe ser un string'}).optional(),
  tipoUsuario: z.string({
                 required_error: 'El tipo de usuario es requerido', 
                 invalid_type_error: 'El tipo de usuario debe ser un string'
               })
               .includes('empleado', {message: 'El usuario debe ser un empleado'}),
  pedidos: z.array(z.instanceof(Pedido)).optional(),
  tarjetasCliente: z.array(z.instanceof(TarjetaCliente)).optional()
})

const clienteToPatchSchema = z.object({
  id: z.number().int().positive().optional(),
  nombre: z.string({invalid_type_error: 'El nombre debe ser un string'}).optional(),
  apellido: z.string({invalid_type_error: 'El apellido debe ser un string'}).optional(),
  mail: z.string({required_error: 'El mail es requerido'}).email({message: 'El mail debe ser válido'}).optional(),
  contrasenia: z.string({invalid_type_error: 'La contraseña debe ser un string'}).optional(),
  telefono: z.string({invalid_type_error: 'El telefono debe ser un string'}).optional(),
  tipoUsuario: z.string({invalid_type_error: 'El tipo de usuario debe ser un string'})
               .includes('cliente', {message: 'El usuario debe ser un cliente'}).optional(),
  pedidos: z.array(z.instanceof(Pedido)).optional(),
  tarjetasCliente: z.array(z.instanceof(TarjetaCliente)).optional()
})

const empleadoToPatchSchema = z.object({
  id: z.number().int().positive().optional(),
  nombre: z.string({invalid_type_error: 'El nombre debe ser un string'}).optional(),
  apellido: z.string({invalid_type_error: 'El apellido debe ser un string'}).optional(),
  mail: z.string({required_error: 'El mail es requerido'}).email({message: 'El mail debe ser válido'}).optional(),
  contrasenia: z.string({invalid_type_error: 'La contraseña debe ser un string'}).optional(),
  telefono: z.string({invalid_type_error: 'El telefono debe ser un string'}).optional(),
  tipoUsuario: z.string({invalid_type_error: 'El tipo de usuario debe ser un string'})
               .includes('empleado', {message: 'El usuario debe ser un empleado'}).optional(),
  pedidos: z.array(z.instanceof(Pedido)).optional(),
  tarjetasCliente: z.array(z.instanceof(TarjetaCliente)).optional()
})

function validarCliente(object: any) {
  try {
    return clienteSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

function validarEmpleado(object: any) {
  try {
    return empleadoSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

function validarClientePatch(object: any) {
  try {
    return clienteToPatchSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

function validarEmpleadoPatch(object: any){
  try {
    return empleadoToPatchSchema.parse(object)
  } catch(error: any) {
    throw error
  }
}

export { validarCliente, validarEmpleado, validarClientePatch, validarEmpleadoPatch }