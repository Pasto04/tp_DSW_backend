import { NotFoundError } from "@mikro-orm/core";

export class TarjetaClienteNotFoundError extends NotFoundError {
  constructor(message: string = 'La tarjeta del cliente ingresado no existe') {
    super(message)
    this.name = 'TarjetaClienteNotFoundError'
  }
}

export class TarjetaClientePreconditionFailed extends Error {
  constructor(message: string = 'No se puede agregar una tarjeta si no hay clientes y/o tarjetas(Visa, Mastercard) registradas') {
    super(message);
    this.name = 'TarjetaClientePreconditionFailed'
  }
}