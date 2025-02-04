import z from 'zod'
import { Pedido } from './pedido.entity.js'

const resenaSchema = z.object({
  pedido: z.instanceof(Pedido),
  //tenemos problemas para que ZOD reconozca el tipo Date, por lo que la entidad "resena" a ser creada no pasa por esta validación
  /*fechaHoraResena: z.string({required_error: 'La fecha de publicación de la reseña es requerida'})
               .datetime('La fecha debe tener el formato aaaa-mm-dd')
               .optional(),
  fechaHoraModificacion: z.string().date('La fecha debe tener el formato aaaa-mm-dd').optional(),*/
  cuerpo: z.string({
            required_error: 'El cuerpo de la reseña es requerido', 
            invalid_type_error: 'El cuerpo de la reseña debe ser un string'
          })
          .max(500, {message: 'El cuerpo de la reseña debe tener menos de 500 caracteres'}),
  puntaje: z.number({
             required_error: 'El puntaje de la reseña es requerido', 
             invalid_type_error: 'El puntaje de la reseña debe ser un número'
            })
            .positive({message: 'El puntaje de la reseña debe ser un número positivo'})
            .lte(5, {message: 'El puntaje de la reseña debe ser un número positivo menor o igual a 5'})
            .gte(1, {message: 'El puntaje de la reseña debe ser un número positivo mayor o igual a 1'})
})

const resenaToPatchSchema = z.object({
  //tenemos problemas para que ZOD reconozca el tipo Date, por lo que la entidad "resena" a ser creada no pasa por esta validación
  /*fechaResena: z.string({required_error: 'La fecha de publicación de la reseña es requerida'})
               .date('La fecha debe tener el formato aaaa-mm-dd').optional(),
  fechaModificacion: z.string().date('La fecha debe tener el formato aaaa-mm-dd').optional(),*/
  cuerpo: z.string({
            required_error: 'El cuerpo de la reseña es requerido', 
            invalid_type_error: 'El cuerpo de la reseña debe ser un string'
          })
          .max(500, {message: 'El cuerpo de la reseña debe tener menos de 500 caracteres'})
          .optional(),
  puntaje: z.number({
             required_error: 'El puntaje de la reseña es requerido', 
             invalid_type_error: 'El puntaje de la reseña debe ser un número'
            })
            .positive({message: 'El puntaje de la reseña debe ser un número positivo'})
            .lte(5, {message: 'El puntaje de la reseña debe ser un número positivo menor o igual a 5'})
            .gte(1, {message: 'El puntaje de la reseña debe ser un número positivo mayor o igual a 1'})
            .optional()
})

function validarResena(object: any) {
  try {
    return resenaSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

function validarResenaPatch(object: any) {
  try {
    return resenaToPatchSchema.parse(object)
  } catch(error: any) {
    throw error
  }
}

export { validarResena, validarResenaPatch }