import z from 'zod'
import { ElaboracionPlato } from '../plato/elaboracionPlato/elaboracionPlato.entity.js'
import { IngredienteDeProveedor } from './ingredienteDeProveedor/ingredienteDeProveedor.entity.js'

const ingredienteSchema = z.object({
  codigo: z.number().int().positive().optional(),
  descIngre: z.string({
                required_error: 'La descripción del ingrediente es requerida', 
                invalid_type_error: 'La descripción del ingrediente debe ser un string'
              }),
  puntoDePedido: z.number({
                   required_error: 'El punto de pedido es requerido', 
                   invalid_type_error: 'El punto de pedido debe ser un número'
                  })
                  .int({message: 'El punto de pedido debe ser un número entero'})
                  .positive({message: 'El punto de pedido debe ser un número entero positivo'}),
  stock: z.number({required_error: 'El stock es requerido', invalid_type_error: 'El stock debe ser un número'})
         .int({message: 'El stock debe ser un número entero'}).positive({message: 'El stock debe ser un número entero positivo'}),
  unidadMedida: z.array(z.enum(['kg', 'g', 'l', 'ml', 'unidades']), {required_error: 'La unidad de medida es requerida', 
                invalid_type_error: 'La unidad de medida debe ser un enum de Unidades de medida'})
                .nonempty({message: 'El ingrediente debe tener al menos una unidad de medida'}),
  aptoCeliacos: z.boolean({message: 'Es necesario informar si el ingrediente es apto para celíacos'}),
  aptoVegetarianos: z.boolean({message: 'Es necesario informar si el ingrediente es apto para vegetarianos'}),
  aptoVeganos: z.boolean({message: 'Es necesario informar si el ingrediente es apto para veganos'}),
  elaboracionesPlato: z.array(z.instanceof(ElaboracionPlato)).optional(),
  ingredienteDeProveedor: z.array(z.instanceof(IngredienteDeProveedor)).optional()
})

const ingredienteToPatchSchema = z.object({
  descIngre: z.string({
                required_error: 'La descripción del ingrediente es requerida', 
                invalid_type_error: 'La descripción del ingrediente debe ser un string'
              })
              .optional(),
  puntoDePedido: z.number({
                   required_error: 'El punto de pedido es requerido', 
                   invalid_type_error: 'El punto de pedido debe ser un número'
                  })
                  .int({message: 'El punto de pedido debe ser un número entero'})
                  .positive({message: 'El punto de pedido debe ser un número entero positivo'}).optional(),
  stock: z.number({required_error: 'El stock es requerido', invalid_type_error: 'El stock debe ser un número'})
         .int({message: 'El stock debe ser un número entero'}).positive({message: 'El stock debe ser un número entero positivo'})
         .optional(),
  unidadMedida: z.array(z.enum(['kg', 'g', 'l', 'ml', 'unidades']), {required_error: 'La unidad de medida es requerida', 
                invalid_type_error: 'La unidad de medida debe ser un enum de Unidades de medida'})
                .nonempty({message: 'El ingrediente debe tener al menos una unidad de medida'}).optional(),
  aptoCeliacos: z.boolean({message: 'Es necesario informar si el ingrediente es apto para celíacos'}).optional(),
  aptoVegetarianos: z.boolean({message: 'Es necesario informar si el ingrediente es apto para vegetarianos'}).optional(),
  aptoVeganos: z.boolean({message: 'Es necesario informar si el ingrediente es apto para veganos'}).optional(),
  elaboracionesPlato: z.array(z.instanceof(ElaboracionPlato)).optional(),
  ingredienteDeProveedor: z.array(z.instanceof(IngredienteDeProveedor)).optional()
})

function validarIngrediente(object: any) {
  try {
    return ingredienteSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

function validarIngredientePatch(object: any) {
  try{
    return ingredienteToPatchSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

export { validarIngrediente, validarIngredientePatch }