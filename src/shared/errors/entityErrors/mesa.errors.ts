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

export class MesaAlreadyInUseError extends Error {
  type: string
  constructor(message: string = 'Ya existen pedidos asociados a esta mesa, por lo que no puede eliminarse') {
    super(message)
    this.type = 'MesaAlreadyInUseError'
  }
}

export class MesaAllBusyError extends Error {
  type: string
  constructor(message: string = 'Todas las mesas están ocupadas') {
    super(message)
    this.type = 'MesaAllBusyError'
  }
}