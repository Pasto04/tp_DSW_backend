import z from 'zod'
import { Pedido } from '../pedido.entity.js'
import { TarjetaCliente } from '../../tarjetaCliente/tarjetaCliente.entity.js'

const pagoSchema = z.object({
  pedido: z.number({
          required_error: 'El pedido es requerido',
          invalid_type_error: 'El pedido debe ser un número',
        })
        .int({ message: 'El pedido debe ser un número entero' })
        .positive({ message: 'El pedido debe ser un número entero positivo'}),
  idPago: z.string({required_error: 'El id del pago es requerido'}).uuid(),
  fechaPago: z.string({required_error: 'La fecha del pago es requerida'})
             .date('La fecha del pago debe tener el formato aaaa-mm-dd').optional(),
  horaPago: z.string({required_error: 'La hora del pago es requerida'}).time({message: 'La hora del pago debe tener el formato'})
            .optional(),
  importe: z.number({invalid_type_error: 'El importe debe ser un número'})
           .positive({message: 'El importe debe ser un número positivo'}),
  tarjetaCliente: z.number({
          required_error: 'La tarjeta del cliente es requerida',
          invalid_type_error: 'La tarjeta del cliente debe ser un número',
        })
        .int({ message: 'La tarjeta del cliente debe ser un número entero' })
        .positive({ message: 'La tarjeta del cliente debe ser un número entero positivo'})
})

export function validarPago(object: any) {
  try {
    return pagoSchema.parse(object)
  } catch(error: any) {
    throw error
  }
}