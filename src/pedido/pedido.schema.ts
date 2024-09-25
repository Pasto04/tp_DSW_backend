import z from 'zod'
import { Usuario } from '../usuario/usuario.entity.js'
import { Mesa } from '../mesa/mesa.entity.js'
import { PlatoPedido } from '../plato/platoPedido/platoPedido.entity.js'
import { BebidaPedido } from '../bebida/bebidaPedido/bebidaPedido.entity.js'
import { Pago } from './pago/pago.entity.js'

const pedidoSchema = z.object({
  nroPed: z.number().int().positive().optional(),
  estado: z.string().includes('en curso', {message: 'El estado del pedido debe ser "en curso"'}).optional(),
  fecha: z.string().date().optional(),
  hora: z.string().time().optional(),
  cliente: z.instanceof(Usuario),
  mesa: z.instanceof(Mesa)
})


const pedidoToPatchSchema = z.object({
  estado: z.string().includes('cancelado', {message: 'El estado del pedido debe ser "cancelado"'}).optional(),
  fechaCancelacion: z.string().date().optional(),
  horaCancelacion: z.string().time().optional(),
  platosPedido: z.array(z.instanceof(PlatoPedido)).optional(),
  bebidasPedido: z.array(z.instanceof(BebidaPedido)).optional()
})


const pedidoToPutSchema = z.object({
  nroPed: z.number().int().positive().optional(),
  estado: z.string().includes('finalizado', {message: 'El estado del pedido debe ser "finalizado"'}),
  fecha: z.string().date(),
  hora: z.string().time(),
  cliente: z.instanceof(Usuario),
  mesa: z.instanceof(Mesa),
  platosPedido: z.array(z.instanceof(PlatoPedido)),
  bebidasPedido: z.array(z.instanceof(BebidaPedido)),
  pago: z.instanceof(Pago)
})

function validarPedido(object: any) {
  try {
    return pedidoSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

function validarPedidoPatch(object: any) {
  try {
    return pedidoToPatchSchema.parse(object)
  } catch(error: any) {
    throw error
  }
}

function validarPedidoPut(object: any) {
  try {
    return pedidoToPutSchema.parse(object)
  } catch(error: any) {
    throw error
  }
}

export { validarPedido, validarPedidoPatch, validarPedidoPut }