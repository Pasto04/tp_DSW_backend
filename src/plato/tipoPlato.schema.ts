import z from 'zod'
import { Plato } from './plato.entity.js'

const tipoPlatoSchema = z.object({
  codigo: z.number().int().positive().optional(),
  descTPlato: z.string(z.enum(['Entrada', 'Plato Principal', 'Postre'], {message: 'El tipo de plato debe ser "Entrada", "Plato Principal" o "Postre"'})),
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