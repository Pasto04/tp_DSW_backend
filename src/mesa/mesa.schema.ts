import z from 'zod'

const mesaSchema = z.object({
  nroMesa: z.number().int().positive().optional(),
  cantPersonasMax: z.number({
                     required_error: 'La cantidad de personas máxima es requerida', 
                     invalid_type_error: 'La cantidad de personas máxima debe ser un número'
                   })
                   .int({message: 'La cantidad de personas máxima debe ser un número entero'})
                   .positive({message: 'La cantidad de personas máxima debe ser un número entero positivo'})
                   .min(2, {message: 'La cantidad máxima de personas debe ser, al menos, 2'}),
  estado: z.string().includes('Disponible', {message: 'El estado de la mesa debe ser Disponible'}),
  codigo: z.string({invalid_type_error: 'El codigo debe ser un string'}).optional()
})

const mesaToPatchSchema = z.object({
  nroMesa: z.number().int().positive().optional(),
  cantPersonaMax: z.number({invalid_type_error: 'La cantidad de personas máxima debe ser un número'})
                  .int({message: 'La cantidad de personas máxima debe ser un número entero'})
                  .positive({message: 'La cantidad de personas máxima debe ser un número entero positivo'})
                  .min(2, {message: 'La cantidad de personas máxima debe ser de, al menos, 2 personas'})
                  .optional(),
  estado: z.string()
          .includes('Disponible' || 'Ocupada', {message: 'El estado de la mesa puede ser Disponible u Ocupada'})
          .or(z.string().includes('Ocupada', {message: 'El estado de la mesa puede ser Disponible u Ocupada'}))
          .optional()
})

function validarMesa(object: any) {
  try {
    return mesaSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

function validarMesaToPatch(object: any) {
  try {
    return mesaToPatchSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

export { validarMesa, validarMesaToPatch }