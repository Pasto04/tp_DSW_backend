import z from 'zod'
import { Pedido } from '../../pedido/pedido.entity.js'
import { Plato } from '../plato.entity.js'

const platoPedidoSchema = z.object({
  pedido: z.instanceof(Pedido),
  plato: z.instanceof(Plato),
  fechaSolicitud: z.string({required_error: 'La fecha de solicitud del plato es requerida'})
                  .date('La fecha de solicitud debe tener el formato aaaa-mm-dd'),
  horaSolicitud: z.string({required_error: 'La hora de solicitud del plato es requerida'})
                 .time({message: 'La hora de solicitud del plato debe tener el formato HH:MM:SS'}),
  cantidad: z.number({
              required_error: 'La cantidad de platos es requerida', 
              invalid_type_error: 'La cantidad de platos es requerida'
            })
            .int({message: 'La cantidad de platos debe ser un número entero'})
            .positive({message: 'La cantidad de platos debe ser un número entero positivo'}),
  entregado: z.boolean({
               required_error: 'El estado de entrega del plato es requerido', 
               invalid_type_error: 'El estado de la entrega del plato debe ser un booleano'})
})

function validarPlatoPedido(object: any) {
  try {
    return platoPedidoSchema.parse(object)
  } catch(error: any) {
    throw error
  }
}

export { validarPlatoPedido }