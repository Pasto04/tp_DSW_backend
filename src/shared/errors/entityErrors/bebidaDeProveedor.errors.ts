import { NotFoundError } from "@mikro-orm/core";

export class BebidaDeProveedorNotFoundError extends NotFoundError {
  constructor(message: string = 'El proveedor de la bebida ingresada no existe') {
    super(message)
    this.name = 'BebidaDeProveedorNotFoundError'
  }
}