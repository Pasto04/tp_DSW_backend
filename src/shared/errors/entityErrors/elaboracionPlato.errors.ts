import { NotFoundError } from "@mikro-orm/core";

export class ElaboracionPlatoNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | object | undefined) {
    let message
    if(params === undefined || typeof params === 'string') {
      message = 'Elaboración de plato no encontrada'
    } else {
      message = 'No se han encontrado elaboraciones de plato'
    }
    super(message);
    this.type = 'ElaboracionPlatoNotFoundError';
  }
}