import { NotFoundError } from "@mikro-orm/core";

export class BebidaDeProveedorNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | object | undefined ) {
    let message
    if(params === undefined || typeof params === 'string') {
      message = 'El proveedor de la bebida ingresada no existe'
    } else {
      message = 'No se ha encontrado ningún proveedor de la bebida'
    }
    super(message)
    this.type = 'BebidaDeProveedorNotFoundError'
  }
}