import { Loaded, NotFoundError } from "@mikro-orm/core"

export class TarjetaNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | undefined | object) {
    let message
    if(params === undefined) {
      message = 'La tarjeta ingresada no existe'

    } else if(typeof params !== 'string') {
      message = 'No se han encontrado tarjetas'
      
    } else {
      message = params
    }
    super(message)
    this.type = 'TarjetaNotFoundError'
  }
}

export class TarjetaUniqueConstraintViolation extends Error {
  type: string
  constructor(message: string = 'Ya existe una tarjeta con ese nombre') {
    super(message);
    this.type = 'TarjetaUniqueConstraintViolation'
  }
}

export class TarjetaAlreadyInUseError extends Error {
  type: string
  constructor(message: string = 'La Tarjeta que desea eliminar tiene tarjetas de cliente asociadas, por lo que la acción no fue posible') {
    super(message)
    this.type = 'TarjetaAlreadyInUseError'
  }
}