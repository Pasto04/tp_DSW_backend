import { NotFoundError } from "@mikro-orm/core";

export class PlatoPedidoNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | undefined | object) {
    let message
    if(params === undefined || typeof params === 'string') {
      message = 'El plato del pedido ingresado no existe'
    } else {
      message = 'No se han encontrado platos de pedido'
    }
    super(message)
    this.type = 'PlatoPedidoNotFoundError'
  }
}