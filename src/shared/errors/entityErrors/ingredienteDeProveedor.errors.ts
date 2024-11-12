import { NotFoundError } from "@mikro-orm/core"

export class IngredienteDeProveedorNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | object | undefined) {
    let message
    if(params === undefined) {
      message = 'El proveedor del ingrediente ingresado no existe'

    } else if(typeof params !== 'string') {
      message = 'No se han encontrado proveedores de ningún ingrediente'

    } else {
      message = params
    }
    super(message)
    this.type = 'IngredienteDeProveedorNotFoundError'
  }
}