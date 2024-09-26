import z from 'zod'
import { Usuario } from '../usuario/usuario.entity.js'
import { Mesa } from '../mesa/mesa.entity.js'
import { PlatoPedido } from '../plato/platoPedido/platoPedido.entity.js'
import { BebidaPedido } from '../bebida/bebidaPedido/bebidaPedido.entity.js'
import { Pago } from './pago/pago.entity.js'
import { Plato } from '../plato/plato.entity.js'
import { orm } from '../shared/db/orm.js'

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
  horaCancelacion: z.string().time().optional()
})


const platoOfPedidoSchema = z.array(z.object({
  numPlato: z.number({required_error: 'El número del plato es requerido', 
                  invalid_type_error: 'El número del plato debe ser un número'})
                  .int({message: 'El número del plato debe ser un número entero'})
                  .positive({message: 'El número del plato debe ser un número entero positivo'}),
  cantidad: z.number({required_error: 'La cantidad del plato es requerida', 
                      invalid_type_error: 'La cantidad del plato debe ser un número'
                    })
                    .int({message: 'La cantidad del plato debe ser un número entero'})
                    .positive({message: 'La cantidad del plato debe ser un número entero positivo'})
})) 

const bebidaOfPedidoSchema = z.array(z.object({
  codBebida: z.number({required_error: 'El código de la bebida es requerido', 
                  invalid_type_error: 'El código de la bebida debe ser un número'})
                  .int({message: 'El código de la bebida debe ser un número entero'})
                  .positive({message: 'El código de la bebida debe ser un número entero positivo'}),
  cantidad: z.number({required_error: 'La cantidad de la bebida es requerida', 
                      invalid_type_error: 'La cantidad de la bebida debe ser un número'
                    })
                    .int({message: 'La cantidad de la bebida debe ser un número entero'})
                    .positive({message: 'La cantidad de la bebida debe ser un número entero positivo'})
})) 


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


function validarPlatoOfPedido(object: any) {
  try {
    return platoOfPedidoSchema.parse(object)
  } catch(error: any) {
    throw error
  }
}

function validarBebidaOfPedido(object: any) {
  try {
    return bebidaOfPedidoSchema.parse(object)
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

export { validarPedido, validarPedidoPatch, validarPedidoPut, validarPlatoOfPedido, validarBebidaOfPedido }