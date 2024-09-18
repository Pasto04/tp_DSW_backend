import z from 'zod'
import { Bebida } from '../bebida.entity.js'
import { Pedido } from '../../pedido/pedido.entity.js'

const bebidaPedidoSchema = z.object ({
  bebida: z.instanceof(Bebida),
  pedido: z.instanceof(Pedido),
  fechaSolicitud: z.string({required_error: 'La fecha de solicitud es requerida'})
                  .date('La fecha de solicitud debe tener el formato aaaa-mm-dd'),
  horaSolicitud: z.string({required_error: 'La hora de solicitud es requerida'})
                 .time({message: 'La hora de solicitud debe tener el formato HH:MM:SS'}),
  cantidad: z.number({
              required_error: 'La cantidad de bebidas es requerida', 
              invalid_type_error: 'La cantidad de bebidas debe ser un número'
            })
            .int({message: 'La cantidad debe ser un número entero'})
            .positive({message: 'La cantidad debe ser un número entero positivo'}),
  entregado: z.boolean({
               required_error: 'El estado de entrega es requerido', 
               invalid_type_error: 'El estado de entrega debe ser un booleano'})
})

function validarBebidaPedido(object: any) {
  try{
    return bebidaPedidoSchema.parse(object)
  } catch(error: any) {
    throw error
  }
}

export { validarBebidaPedido }