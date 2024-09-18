import { NotFoundError } from "@mikro-orm/core";

export class ProveedorNotFoundError extends NotFoundError {
  constructor(message: string = 'El proveedor ingresado no existe') {
    super(message)
    this.name = 'ProveedorNotFoundError'
  }
}