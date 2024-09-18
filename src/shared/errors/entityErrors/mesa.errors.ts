import { NotFoundError } from "@mikro-orm/core";

export class MesaNotFoundError extends NotFoundError {
  constructor(message?: string)
  constructor(params: string | any | undefined){
    let message
    if(typeof params === 'string' || params === undefined){
      message = 'La mesa no existe'
    } else {
      message = 'No se ha encontrado ninguna mesa'
    }
    super(message)
    this.name = 'MesaNotFoundError'
  }
}