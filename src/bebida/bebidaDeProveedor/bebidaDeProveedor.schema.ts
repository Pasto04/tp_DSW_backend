import z from 'zod'
import { Bebida } from '../bebida.entity.js'
import { Proveedor } from '../../proveedor/proveedor.entity.js'

const bebidaDeProveedorSchema = z.object({
  bebida: z.instanceof(Bebida),
  proveedor: z.instanceof(Proveedor)
})

function validarBebidaDeProveedor(object: any) {
  try {
    return bebidaDeProveedorSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

export { validarBebidaDeProveedor }