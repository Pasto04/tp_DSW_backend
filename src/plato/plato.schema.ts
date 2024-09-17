import z from 'zod'
import { TipoPlato } from './tipoPlato.entity.js'
import { ElaboracionPlato } from './elaboracionPlato/elaboracionPlato.entity.js'
import { PlatoPedido } from './platoPedido/platoPedido.entity.js'

const platoSchema = z.object({
  numPlato: z.number().int().positive().optional(),
  descripcion: z.string({
                 required_error: 'La descripción del plato es requerida', 
                 invalid_type_error: 'La descripción del plato debe ser un string'
                }),
  tiempo: z.number({required_error: 'El tiempo (en minutos) es requerido', invalid_type_error: 'El tiempo debe ser un número'})
          .int({message: 'El tiempo debe ser un número entero'}).positive({message: 'El tiempo debe ser un número entero positivo'}),
  precio: z.number({required_error: 'El precio (en pesos) es requerido', invalid_type_error: 'El precio debe ser un número'})
          .positive({message: 'El precio debe ser un número positivo'}),
  tipoPlato: z.instanceof(TipoPlato),
  elaboracionesPlato: z.array(z.instanceof(ElaboracionPlato)).optional(),
  platoPedidos: z.array(z.instanceof(PlatoPedido)).optional()
})

const platoToPatchSchema = z.object({
  descripcion: z.string({
                 required_error: 'La descripción del plato es requerida', 
                 invalid_type_error: 'La descripción del plato debe ser un string'
                }).optional(),
  tiempo: z.number({required_error: 'El tiempo (en minutos) es requerido', invalid_type_error: 'El tiempo debe ser un número'})
          .int({message: 'El tiempo debe ser un número entero'}).positive({message: 'El tiempo debe ser un número entero positivo'})
          .optional(),
  precio: z.number({required_error: 'El precio (en pesos) es requerido', invalid_type_error: 'El precio debe ser un número'})
          .positive({message: 'El precio debe ser un número positivo'}).optional(),
  tipoPlato: z.instanceof(TipoPlato).optional(),
  elaboracionesPlato: z.array(z.instanceof(ElaboracionPlato)).optional(),
  platoPedidos: z.array(z.instanceof(PlatoPedido)).optional()
})

function validarPlato(object: any) {
  try {
    return platoSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

function validarPlatoPatch(object: any) {
  try {
    return platoToPatchSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

export { validarPlato, validarPlatoPatch }