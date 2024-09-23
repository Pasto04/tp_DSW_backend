import { NotFoundError } from "@mikro-orm/core";

export class BebidaPedidoNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | object | undefined) {
    let message
    if(params === undefined || typeof params === 'string') {
      message = 'La bebida del pedido ingresado no existe'
    } else {
      message = 'No se han encontrado bebidas de pedido'
    }
    super(message)
    this.type = 'BebidaPedidoNotFoundError'
  }
}