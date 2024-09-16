import z from 'zod'
import { TarjetaCliente } from './tarjetaCliente.entity.js'

const tarjetaSchema = z.object({
  idTarjeta: z.number().int().positive().optional(),
  descTarjeta: z.string({
                 required_error: 'La descripción de la tarjeta es requerida', 
                 invalid_type_error: 'La descripción de la tarjeta debe ser un string'
               }),
  tarjetaClientes: z.array(z.instanceof(TarjetaCliente)).optional()
})

function validarTarjeta(object: any) {
  try {
    return tarjetaSchema.parse(object)
  } catch (error: any){
    throw error
  }
}

export { validarTarjeta }