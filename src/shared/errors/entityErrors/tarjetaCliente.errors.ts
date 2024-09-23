import { NotFoundError } from "@mikro-orm/core";

export class TarjetaClienteNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | object | undefined) {
    let message
    if(params === undefined || typeof params === 'string') {
      message = 'La tarjeta del cliente ingresado no se encuentra registrada'
    } else {
      message = `No hay tarjetas del cliente registradas`
    }
    super(message)
    this.type = 'TarjetaClienteNotFoundError'
  }
}

export class TarjetaClientePreconditionFailed extends Error {
  type: string
  constructor(message: string = 'No se puede agregar una tarjeta si no hay clientes y/o tarjetas(Visa, Mastercard) registradas') {
    super(message);
    this.type = 'TarjetaClientePreconditionFailed'
  }
}

export class TarjetaClienteUniqueConstraintViolation extends Error {
  type: string
  constructor(message: string = 'Ya existe una tarjeta con ese número') {
    super(message);
    this.type = 'TarjetaClienteUniqueConstraintViolation'
  }
} 