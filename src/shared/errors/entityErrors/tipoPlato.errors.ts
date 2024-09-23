import { NotFoundError } from "@mikro-orm/core";

export class TipoPlatoNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | undefined | object) {
    let message
    if (params === undefined || typeof params === 'string') {
      message = 'El tipo de plato ingresado no existe'
    } else {
      message = 'No se ha encontrado ningún tipo de plato'
    }
    super(message)
    this.type = 'TipoPlatoNotFoundError'
  }
}

export class TipoPlatoUniqueConstraintViolation extends Error {
  type: string
  constructor(message: string = 'Ya existe un tipo de plato con ese nombre') {
    super(message)
    this.type = 'TipoPlatoUniqueConstraintViolation'
  }
}