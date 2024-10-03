import { NotFoundError } from "@mikro-orm/core";

export class ResenaNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | undefined | object) {
    let message
    if(params === undefined) {
      message = 'La reseña ingresada no existe'

    } else if(typeof params !== 'string') {
      message = 'No se han encontrado reseñas'
      
    } else {
      message = params
    }
    super(message)
    this.type = 'ResenaNotFoundError'
  }
}

export class ResenaPreconditionFailed extends Error {
  type: string
  constructor(message: string = 'No se puede crear una reseña si no hay pedidos registrados') {
    super(message);
    this.type = 'ResenaPreconditionFailed'
  }
}