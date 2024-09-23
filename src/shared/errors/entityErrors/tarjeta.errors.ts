import { NotFoundError } from "@mikro-orm/core";

export class TarjetaNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | undefined | object) {
    let message
    if(params === undefined || typeof params === 'string') {
      message = 'La tarjeta ingresada no existe'
    } else {
      message = 'No se han encontrado tarjetas'
    }
    super(message)
    this.type = 'TarjetaNotFoundError'
  }
}

export class TarjetaUniqueConstraintViolation extends Error {
  type: string
  constructor(message: string = 'Ya existe una tarjeta con ese nombre') {
    super(message);
    this.type = 'TarjetaUniqueConstraintViolation'
  }
}