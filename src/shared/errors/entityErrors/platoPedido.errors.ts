import { NotFoundError } from "@mikro-orm/core";

export class PlatoPedidoNotFoundError extends NotFoundError {
  constructor(message: string = 'El plato del pedido ingresado no existe') {
    super(message)
    this.name = 'PlatoPedidoNotFoundError'
  }
}