import { NotFoundError } from "@mikro-orm/core"

export class MesaNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | object | undefined){
    let message
    if(params === undefined){
      message = 'La mesa no existe'

    } else if(typeof params !== 'string') {
      message = 'No se ha encontrado ninguna mesa'

    } else {
      message = params
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

export class MesaEstadoError extends Error {
  type: string
  constructor(message: string = 'El estado de la mesa debe ser Disponible u Ocupada') {
    super(message)
    this.type = 'MesaEstadoError'
  }
}

export class MesaCodigoError extends Error {
  type: string
  constructor(message: string = 'El código ingresado no coincide con el de la mesa') {
    super(message)
    this.type = 'MesaCodigoError'
  }
}