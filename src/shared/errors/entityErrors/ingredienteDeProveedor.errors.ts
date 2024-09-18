import { NotFoundError } from "@mikro-orm/core";

export class IngredienteDeProveedorNotFoundError extends NotFoundError {
  constructor(message: string = 'El proveedor del ingrediente ingresado no existe') {
    super(message)
    this.name = 'IngredienteDeProveedorNotFoundError'
  }
}