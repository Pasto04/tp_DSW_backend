import { NotFoundError } from "@mikro-orm/core";

export class PlatoNotFoundError extends NotFoundError {
  constructor(message: string = 'El plato ingresado no existe') {
    super(message)
    this.name = 'PlatoNotFoundError'
  }
}

export class PlatoPreconditionFailed extends Error {
  constructor(message: string = 'No se puede crear un plato si no hay ingredientes y/o tipos de plato registrados') {
    super(message)
    this.name = 'PlatoPreconditionFailed'
  }
}

export class PlatoUniqueConstraintViolation extends Error {
  constructor(message: string = 'Ya existe una plato con ese nombre') {
    super(message)
    this.name = 'PlatoUniqueConstraintViolation'
  }
}