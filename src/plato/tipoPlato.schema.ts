import z from 'zod'
import { Plato } from './plato.entity.js'

const tipoPlatoSchema = z.object({
  codigo: z.number().int().positive().optional(),
  descTPlato: z.enum(['Entrada', 'Plato principal', 'Postre']).array()
              .nonempty({message: 'Un tipo de plato debe tener una descripción'})
              .max(1, {message: 'Un tipo de plato puede tener sólo una descripción'}),
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