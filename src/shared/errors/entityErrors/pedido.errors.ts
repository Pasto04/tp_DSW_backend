import { NotFoundError } from "@mikro-orm/core";


export class PedidoNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: object | string | undefined) {
    let message
    if(params === undefined || typeof params === 'string'){
      message = 'El pedido ingresado no existe'
    } else {
      message = 'No se ha encontrado ningún pedido'
    }
    super(message);
    this.type = 'PedidoNotFoundError'
  }
}

export class PedidoPreconditionFailed extends Error {
  type: string
  constructor(message: string = 'No se puede crear un pedido si no hay clientes y/o mesas registradas') {
    super(message);
    this.type = 'PedidoPreconditionFailed'
  }
}