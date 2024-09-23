import { NotFoundError } from "@mikro-orm/core";

export class MesaNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | object | undefined){
    let message
    if(typeof params === 'string' || params === undefined){
      message = 'La mesa no existe'
    } else {
      message = 'No se ha encontrado ninguna mesa'
    }
    super(message)
    this.type = 'MesaNotFoundError'
  }
}