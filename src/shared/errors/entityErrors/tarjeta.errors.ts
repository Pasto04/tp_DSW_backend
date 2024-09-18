import { NotFoundError } from "@mikro-orm/core";

export class TarjetaNotFoundError extends NotFoundError {
  constructor(message: string = 'La tarjeta ingresada no existe') {
    super(message)
    this.name = 'TarjetaNotFoundError'
  }
}

export class TarjetaUniqueConstraintViolation extends Error {
  constructor(message: string = 'Ya existe una tarjeta con ese nombre') {
    super(message);
    this.name = 'TarjetaUniqueConstraintViolation'
  }
}