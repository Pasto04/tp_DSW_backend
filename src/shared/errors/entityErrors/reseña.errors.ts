import { NotFoundError } from "@mikro-orm/core";

export class ResenaNotFoundError extends NotFoundError {
  constructor(message: string = 'La reseña ingresada no existe') {
    super(message)
    this.name = 'ResenaNotFoundError'
  }
}

export class ResenaPreconditionFailed extends Error {
  constructor(message: string = 'No se puede crear una reseña si no hay pedidos registrados') {
    super(message);
    this.name = 'ResenaPreconditionFailed'
  }
}