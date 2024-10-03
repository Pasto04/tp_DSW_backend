import z from 'zod'
import { Pedido } from '../pedido.entity.js'
import { TarjetaCliente } from '../../tarjetaCliente/tarjetaCliente.entity.js'

const pagoSchema = z.object({
  pedido: z.instanceof(Pedido),
  idPago: z.string({required_error: 'El id del pago es requerido'}).uuid(),
  fechaPago: z.string({required_error: 'La fecha del pago es requerida'})
             .date('La fecha del pago debe tener el formato aaaa-mm-dd').optional(),
  horaPago: z.string({required_error: 'La hora del pago es requerida'}).time({message: 'La hora del pago debe tener el formato'})
            .optional(),
  importe: z.number({invalid_type_error: 'El importe debe ser un número'})
           .positive({message: 'El importe debe ser un número positivo'}),
  tarjetaCliente: z.instanceof(TarjetaCliente)
})

export function validarPago(object: any) {
  try {
    return pagoSchema.parse(object)
  } catch(error: any) {
    throw error
  }
}