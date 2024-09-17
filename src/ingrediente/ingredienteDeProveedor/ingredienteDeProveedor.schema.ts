import z from 'zod'
import { Ingrediente } from '../ingrediente.entity.js'
import { Proveedor } from '../../proveedor/proveedor.entity.js'

const ingredienteDeProveedorSchema = z.object({
  ingrediente: z.instanceof(Ingrediente),
  proveedor: z.instanceof(Proveedor)
})

function validarIngredienteDeProveedor(object: any) {
  try {
    return ingredienteDeProveedorSchema.parse(object)
  } catch (error: any){
    throw error
  }
}

export { validarIngredienteDeProveedor }