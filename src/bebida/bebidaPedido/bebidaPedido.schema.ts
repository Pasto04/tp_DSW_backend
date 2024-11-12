import z from 'zod'
import { Bebida } from '../bebida.entity.js'
import { Pedido } from '../../pedido/pedido.entity.js'

const bebidaPedidoSchema = z.object({
  bebida: z.instanceof(Bebida),
  pedido: z.instanceof(Pedido),
  /*fechaSolicitud: z
    .date({ message: 'La fecha de solicitud debe tener el formato aaaa-mm-dd' })
    .optional(),
  horaSolicitud: z
    .string()
    .time({ message: 'La hora de solicitud debe tener el formato HH:MM:SS' })
    .optional(),*/
  cantidad: z
    .number({
      required_error: 'La cantidad de bebidas es requerida',
      invalid_type_error: 'La cantidad de bebidas debe ser un número',
    })
    .int({ message: 'La cantidad debe ser un número entero' })
    .positive({ message: 'La cantidad debe ser un número entero positivo' }),
});

const bebidaPedidoToPatchSchema = z.object({
  bebida: z.instanceof(Bebida),
  pedido: z.instanceof(Pedido),
  fechaSolicitud: z
    .string({ required_error: 'La fecha de solicitud es requerida' })
    .date('La fecha de solicitud debe tener el formato aaaa-mm-dd'),
  horaSolicitud: z
    .string({ required_error: 'La hora de solicitud es requerida' })
    .time({ message: 'La hora de solicitud debe tener el formato HH:MM:SS' }),
  /*cantidad: z
    .number({
      required_error: 'La cantidad de bebidas es requerida',
      invalid_type_error: 'La cantidad de bebidas debe ser un número',
    })
    .int({ message: 'La cantidad debe ser un número entero' })
    .positive({ message: 'La cantidad debe ser un número entero positivo' }),*/
});

function validarBebidaPedido(object: any) {
  try {
    return bebidaPedidoSchema.parse(object)
  } catch (error: any) {
    throw error;
  }
}

function validarBebidaPedidoToPatch(object: any) {
  try {
    return bebidaPedidoToPatchSchema.parse(object)
  } catch (error: any) {
    throw error;
  }
}

export { validarBebidaPedido, validarBebidaPedidoToPatch }
