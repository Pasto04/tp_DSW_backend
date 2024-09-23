import { NotFoundError } from "@mikro-orm/core";

export class ProveedorNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | undefined | object) {
    let message
    if(params === undefined || typeof params === 'string') {
      message = 'El proveedor ingresado no existe'
    } else {
      message = 'No se han encontrado proveedores'
    }
    super(message)
    this.type = 'ProveedorNotFoundError'
  }
}

export class ProveedorUniqueConstraintViolation extends Error {
  type: string
  constructor(message: string = 'El cuit, razón social, número de teléfono y/o email ingresado ya se encuentra registrado') {
    super(message)
    this.type = 'ProveedorUniqueConstraintViolation'
  }
}