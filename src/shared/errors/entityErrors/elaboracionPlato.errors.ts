import { NotFoundError } from "@mikro-orm/core"

export class ElaboracionPlatoNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | object | undefined) {
    let message
    if(params === undefined) {
      message = 'Elaboración de plato no encontrada'

    } else if(typeof params !== 'string') {
      message = 'No se han encontrado elaboraciones de plato'

    } else {
      message = params
    }
    super(message);
    this.type = 'ElaboracionPlatoNotFoundError'
  }
}