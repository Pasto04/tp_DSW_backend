import z from 'zod'

const bebidaSchema = z.object({
  codBebida: z.number({
               required_error: 'El código de la bebida es requerido',
               invalid_type_error: 'El código de la bebida debe ser un número'
             })
             .int({message: 'El código de la bebida debe ser un número entero'})
             .positive({message: 'El código de la bebida debe ser un número entero positivo'}).optional(),
  descripcion: z.string({
                 required_error: 'La descripción de la bebida es requerida',
                 invalid_type_error: 'La descripción de la bebida debe ser un texto'
               }),
  unidadMedida: z.string({
                  required_error: 'La unidad de medida de la bebida es requerida',
                  invalid_type_error: 'La unidad de medida de la bebida debe ser un texto'
                })
                .includes('l', {message: 'La unidad de medida de la bebida debe ser "l" (litros) o "ml" (mililitros)'})
                .or(z.string({
                      required_error: 'La unidad de medida de la bebida es requerida',
                      invalid_type_error: 'La unidad de medida de la bebida debe ser un texto'
                    })
                    .includes('ml', {message: 'La unidad de medida de la bebida debe ser "l" (litros) o "ml" (mililitros)'})),
  contenido: z.number({
               required_error: 'El contenido de la bebida es requerido',
               invalid_type_error: 'El contenido de la bebida debe ser un número'
             })
             .int({message: 'El contenido de la bebida debe ser un número entero'})
             .positive({message: 'El contenido de la bebida debe ser un número entero positivo'}),
  precio: z.number({
            required_error: 'El precio de la bebida es requerido', 
            invalid_type_error: 'El precio de la bebida debe ser un número'
          })
          .positive({message: 'El precio de la bebida debe ser un número positivo'})
})

const bebidaToPatchSchema = z.object({
  descripcion: z.string({
                 required_error: 'La descripción de la bebida es requerida',
                 invalid_type_error: 'La descripción de la bebida debe ser un texto'
               }).optional(),
  unidadMedida: z.string({
                  required_error: 'La unidad de medida de la bebida es requerida',
                  invalid_type_error: 'La unidad de medida de la bebida debe ser un texto'
                })
                .includes('l', {message: 'La unidad de medida de la bebida debe ser "l" (litros) o "ml" (mililitros)'})
                .or(z.string({
                      required_error: 'La unidad de medida de la bebida es requerida',
                      invalid_type_error: 'La unidad de medida de la bebida debe ser un texto'
                    })
                    .includes('ml', {message: 'La unidad de medida de la bebida debe ser "l" (litros) o "ml" (mililitros)'}))
                .optional(),
  contenido: z.number({
               required_error: 'El contenido de la bebida es requerido',
               invalid_type_error: 'El contenido de la bebida debe ser un número'
             })
             .int({message: 'El contenido de la bebida debe ser un número entero'})
             .positive({message: 'El contenido de la bebida debe ser un número entero positivo'}).optional()
})

function validarBebida(object: any) {
  try {
    return bebidaSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

function validarBebidaPatch(object: any) {
  try {
    return bebidaToPatchSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

export { validarBebida, validarBebidaPatch }