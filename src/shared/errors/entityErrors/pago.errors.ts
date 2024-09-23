import { NotFoundError } from "@mikro-orm/core";

export class PagoNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | undefined | object) {
    let message
    if(params === undefined || typeof params === 'string') {
      message = 'El pago ingresado no existe'
    } else {
      message = 'No se han encontrado pagos'
    }
    super(message)
    this.type = 'PagoNotFoundError'
  }
}

export class PagoPreconditionFailed extends Error {
  type: string
  constructor(message: string = 'No se puede realizar un pago si no hay pedidos y/o tarjetas de clientes registradas') {
    super(message);
    this.type = 'PagoPreconditionFailed'
  }
}