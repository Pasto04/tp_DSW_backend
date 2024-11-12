import { NotFoundError } from "@mikro-orm/core"

export class BebidaDeProveedorNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | object | undefined ) {
    let message
    if(params === undefined) {
      message = 'El proveedor de la bebida ingresada no existe'

    } else if(typeof params !== 'string') {
      message = 'No se ha encontrado ningún proveedor de la bebida'
      
    } else {
      message = params
    }
    super(message)
    this.type = 'BebidaDeProveedorNotFoundError'
  }
}