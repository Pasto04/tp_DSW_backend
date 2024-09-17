import z from 'zod'
import { Ingrediente } from '../../ingrediente/ingrediente.entity.js'
import { Plato } from '../plato.entity.js'

const elaboracionPlatoSchema = z.object({
  ingrediente: z.instanceof(Ingrediente),
  plato: z.instanceof(Plato),
  cantidadNecesaria: z.number({
                       required_error: 'La cantidad del ingrediente necesaria para preparar el plato es requerida',
                       invalid_type_error: 'La cantidad del ingrediente necesaria para preparar el plato debe ser un número'
                     })
                     .int({message: 'La cantidad del ingrediente necesaria para preparar el plato debe ser un número entero'})
                     .positive({message: 'La cantidad del ingrediente necesaria para preparar el plato debe ser un número entero positivo'})
})

const elaboracionPlatoPatchSchema = z.object({
  cantidadNecesaria: z.number({
                       invalid_type_error: 'La cantidad del ingrediente necesaria para preparar el plato debe ser un número'
                     })
                     .int({message: 'La cantidad del ingrediente necesaria para preparar el plato debe ser un número entero'})
                     .positive({message: 'La cantidad del ingrediente necesaria para preparar el plato debe ser un número entero positivo'})
                     .optional()
})

function validarElaboracionPlato(object: any) {
  try {
    return elaboracionPlatoSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

function validarElaboracionPlatoPatch(object: any) {
  try {
    return elaboracionPlatoPatchSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

export { validarElaboracionPlato, validarElaboracionPlatoPatch }