import { NotFoundError } from "@mikro-orm/core";

export class PlatoNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | undefined | object) {
    let message
    if(params === undefined || typeof params === 'string') {
      message = 'El plato ingresado no existe'
    } else {
      message = 'No se han encontrado platos'
    }
    super(message)
    this.type = 'PlatoNotFoundError'
  }
}

export class PlatoPreconditionFailed extends Error {
  type: string
  constructor(message: string = 'No se puede crear un plato si no hay ingredientes y/o tipos de plato registrados') {
    super(message)
    this.type = 'PlatoPreconditionFailed'
  }
}

export class PlatoUniqueConstraintViolation extends Error {
  type: string
  constructor(message: string = 'Ya existe una plato con ese nombre') {
    super(message)
    this.type = 'PlatoUniqueConstraintViolation'
  }
}

export class PlatoBadRequest extends Error {
  type: string
  constructor(message: string = 'Ingrese los ingredientes que componen el plato y la cantidad necesaria') {
    super(message)
    this.type = 'PlatoBadRequest'
  }
}