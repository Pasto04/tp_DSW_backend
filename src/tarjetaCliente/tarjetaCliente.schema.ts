import z from 'zod'
import { Tarjeta } from './tarjeta.entity.js'
import { Pago } from '../pedido/pago/pago.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'

const tarjetaClienteSchema = z.object({
  idTarjeta: z.number().int().positive().optional(),
  nroTarjeta: z.string({
                required_error: 'El número de la tarjeta es requerido', 
                invalid_type_error: 'El número de la tarjeta debe ser un string'
              }),
  tipoTarjeta: z.string({
                 required_error: 'El tipo de tarjeta es requerido', 
                 invalid_type_error: 'El tipo de tarjeta debe ser un string'
               })
               .includes('Débito', {message: 'El tipo de tarjeta es "Debito" o "Credito"'})
               .or(z.string({
                     required_error: 'El tipo de tarjeta es requerido', 
                     invalid_type_error: 'El tipo de tarjeta debe ser un string'
                   })
                   .includes('Crédito', {message: 'El tipo de tarjeta es "Débito" o "Crédito"'})),
  bancoTarjeta: z.string({
                  required_error: 'El banco de la tarjeta es requerido', 
                  invalid_type_error: 'El banco de la tarjeta debe ser un string'
                }),
  titular: z.string({
             required_error: 'El titular de la tarjeta es requerido', 
             invalid_type_error: 'El titular de la tarjeta debe ser un string'
           }),
  vencimiento: z.object({
    month: z.number({
             required_error: 'El mes de vencimiento es requerido', 
             invalid_type_error: 'El mes de vencimiento es un número'
           })
           .int({message: 'El mes de vencimiento es un número entero'})
           .positive({message: 'El mes de vencimiento es un número entero positivo'})
           .gte(1, {message: 'El mes de vencimiento es un número entero positivo mayor o igual a 1'})
           .lte(12, {message: 'El mes de vencimiento es un número entero positivo menor o igual a 12'}),
    year: z.number({
            required_error: 'El año de vencimiento es requerido', 
            invalid_type_error: 'El año de nacimiento es un número'
          })
          .int({message: 'El año de vencimiento es un número entero'})
          .positive({message: 'El año de vencimiento es un número entero positivo'})
          .gte(2024, {message: 'El año de vencimiento es un número entero positivo mayor o igual a 2024'})
  }),
  codSeguridad: z.number({
                  required_error: 'El código de seguridad es requerido', 
                  invalid_type_error: 'El código de seguridad es un número'
                })
                .int({message: 'El código de seguridad es un número entero'})
                .positive({message: 'El código de seguridad es un número entero positivo'})
                .gte(100, {message: 'El código de seguridad es un número entero positivo de 3 dígitos'})
                .lte(999, {message: 'El código de seguridad es un número entero positivo de 3 dígitos'}),
  tarjeta: z.instanceof(Tarjeta),
  pagos: z.array(z.instanceof(Pago)).optional(),
  cliente: z.instanceof(Usuario)
})

function validarTarjetaCliente(object: any) {
  try{
    return tarjetaClienteSchema.parse(object)
  } catch(error: any) {
    throw error
  }
}

export { validarTarjetaCliente }