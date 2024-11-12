import { NotFoundError } from "@mikro-orm/core"

export class ProveedorNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | undefined | object) {
    let message
    if(params === undefined) {
      message = 'El proveedor ingresado no existe'

    } else if(typeof params !== 'string') {
      message = 'No se han encontrado proveedores'

    } else {
      message = params
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

export class ProveedorIsUniqueForIngredienteError extends Error {
  type: string
  constructor(message: string = 'Existe al menos un ingrediente cuyo único proveedor es el que usted desea eliminar, por lo que la acción no fue posible') {
    super(message)
    this.type = 'ProveedorIsUniqueForIngredienteError'
  }
}