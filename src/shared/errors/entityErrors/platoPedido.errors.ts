import { NotFoundError } from "@mikro-orm/core";

export class PlatoPedidoNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | undefined | object) {
    let message
    if(params === undefined || typeof params === 'string') {
      message = 'El plato ingresado no se encuentra en el pedido'
    } else {
      message = 'No se han encontrado platos de pedido'
    }
    super(message)
    this.type = 'PlatoPedidoNotFoundError'
  }
}

export class PlatoPedidoAlreadyDeliveredError extends Error {
  type: string
  constructor(message: string = 'El plato ya ha sido entregado') {
    super(message)
    this.type = 'PlatoPedidoAlreadyDeliveredError'
  }
}