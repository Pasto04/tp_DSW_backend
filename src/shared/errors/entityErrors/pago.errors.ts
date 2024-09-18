import { NotFoundError } from "@mikro-orm/core";

export class PagoNotFoundError extends NotFoundError {
  constructor(message: string = 'El pago ingresado no existe') {
    super(message)
    this.name = 'PagoNotFoundError'
  }
}

export class PagoPreconditionFailed extends Error {
  constructor(message: string = 'No se puede realizar un pago si no hay pedidos y/o tarjetas de clientes registradas') {
    super(message);
    this.name = 'PagoPreconditionFailed'
  }
}