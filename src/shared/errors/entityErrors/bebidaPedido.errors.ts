import { NotFoundError } from "@mikro-orm/core";

export class BebidaPedidoNotFoundError extends NotFoundError {
  constructor(message: string = 'La bebida del pedido ingresado no existe') {
    super(message)
    this.name = 'BebidaPedidoNotFoundError'
  }
}