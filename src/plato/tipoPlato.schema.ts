import z from 'zod'
import { Plato } from './plato.entity.js'

const tipoPlatoSchema = z.object({
  codigo: z.number().int().positive().optional(),
  descTPlato: z.string({
                required_error: 'La descripción del tipo de plato es requerida', 
                invalid_type_error: 'La descripción del tipo de plato debe ser un string'
              })
              .includes('Entrada', {message: 'El tipo de plato puede ser -Entrada-, -Plato Principal- o -Postre-'})
              .or(z.string({
                    required_error: 'La descripción del tipo de plato es requerida', 
                    invalid_type_error: 'La descripción del tipo de plato debe ser un string'
                  })
                  .includes('Plato Principal', {message: 'El tipo de plato puede ser -Entrada-, -Plato Principal- o -Postre-'})
                  .or(z.string({
                        required_error: 'La descripción del tipo de plato es requerida', 
                        invalid_type_error: 'La descripción del tipo de plato debe ser un string'
                      })
                      .includes('Postre', {message: 'El tipo de plato puede ser -Entrada-, -Plato Principal- o -Postre-'}))),
  platos: z.array(z.instanceof(Plato)).optional()
})

function validarTipoPlato(object: any) {
  try {
    return tipoPlatoSchema.parse(object)
  } catch(error: any) {
    throw error
  }
}

export { validarTipoPlato }