import { NotFoundError } from "@mikro-orm/core"

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

export class ResenaAPedidoNoFinalizado extends Error {
  type: string
  constructor(message: string = 'No se puede crear una reseña si el pedido no ha finalizado') {
    super(message);
    this.type = 'ResenaPreconditionFailed'
  }
}

export class ResenaAlreadyExists extends Error {
  type: string
  constructor(message: string = 'Ya existe una reseña para ese pedido') {
    super(message);
    this.type = 'ResenaAlreadyExists'
  }
}

export class ResenaDePedidoAjeno extends Error {
  type: string
  constructor(message: string = 'No puedes crear una reseña para un pedido que no realizaste') {
    super(message);
    this.type = 'ResenaConflict'
  }
}