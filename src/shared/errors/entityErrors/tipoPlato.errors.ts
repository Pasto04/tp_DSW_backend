import { NotFoundError } from "@mikro-orm/core";

export class TipoPlatoNotFoundError extends NotFoundError {
  constructor(message: string = 'El tipo de plato ingresado no existe') {
    super(message)
    this.name = 'TipoPlatoNotFoundError'
  }
}