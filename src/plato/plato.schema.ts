import z from 'zod'
import { TipoPlato } from './tipoPlato.entity.js'
import { ElaboracionPlato } from './elaboracionPlato/elaboracionPlato.entity.js'
import { PlatoPedido } from './platoPedido/platoPedido.entity.js'
import { Ingrediente } from '../ingrediente/ingrediente.entity.js'
import { Loaded } from '@mikro-orm/core'

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

  aptoCeliacos: z.boolean({message: 'Se debe indicar si el plato es apto para celíacos o no'}).optional(),

  aptoVegetarianos: z.boolean({message: 'Se debe indicar si el plato es apto para vegetarianos o no'}).optional(),

  aptoVeganos: z.boolean({message: 'Se debe indicar si el plato es apto para veganos o no'}).optional(),

  tipoPlato: z.instanceof(TipoPlato, {message: 'El tipo de plato debe ser del tipo "TipoPlato"'}),

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

  aptoCeliacos: z.boolean({message: 'Se debe indicar si el plato es apto para celíacos o no'}).optional(),

  aptoVegetarianos: z.boolean({message: 'Se debe indicar si el plato es apto para vegetarianos o no'}).optional(),

  aptoVeganos: z.boolean({message: 'Se debe indicar si el plato es apto para veganos o no'}).optional(),

  tipoPlato: z.instanceof(TipoPlato).optional(),

  elaboracionesPlato: z.array(z.instanceof(ElaboracionPlato)).optional(),

  platoPedidos: z.array(z.instanceof(PlatoPedido)).optional()
})


const ingredientesOfPlatoSchema = z.array(z.object({
    ingrediente: z.instanceof(Ingrediente, {message: 'El ingrediente debe ser del tipo "Ingrediente"'}), 
    cantidadNecesaria: z.number({
      required_error: 'La cantidad del ingrediente para preparar el plato es requerida', 
      invalid_type_error: 'La cantidad del ingrediente para preparar el plato es un número'
    })
    .int({message: 'La cantidad del ingrediente para preparar el plato es un número entero'})
    .positive({message: 'La cantidad del ingrediente para preparar el plato es un número entero positivo'})}))



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

function validarIngredientesOfPlato(object: any) {
  try {
    return ingredientesOfPlatoSchema.parse(object)
  } catch(error: any) {
    throw error
  }
}

export { validarPlato, validarPlatoPatch, validarIngredientesOfPlato }