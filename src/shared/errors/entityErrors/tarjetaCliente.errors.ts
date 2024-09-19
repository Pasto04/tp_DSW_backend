import { NotFoundError } from "@mikro-orm/core";

export class TarjetaClienteNotFoundError extends NotFoundError {
  constructor(message?: string)
  constructor(params: string | any | undefined) {
    let message
    if(params === undefined || typeof params === 'string') {
      message = 'La tarjeta del cliente ingresado no se encuentra registrada'
    } else {
      message = `No hay tarjetas del cliente registradas`
    }
    super(message)
    this.name = 'TarjetaClienteNotFoundError'
  }
}

export class TarjetaClientePreconditionFailed extends Error {
  constructor(message: string = 'No se puede agregar una tarjeta si no hay clientes y/o tarjetas(Visa, Mastercard) registradas') {
    super(message);
    this.name = 'TarjetaClientePreconditionFailed'
  }
}

export class TarjetaClienteUniqueConstraintViolation extends Error {
  constructor(message: string = 'Ya existe una tarjeta con ese número') {
    super(message);
    this.name = 'TarjetaClienteUniqueConstraintViolation'
  }
} 