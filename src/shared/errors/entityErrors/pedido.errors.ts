import { NotFoundError } from "@mikro-orm/core";


export class PedidoNotFoundError extends NotFoundError {
  constructor(message?: string)
  constructor(params: any | string | undefined) {
    let message
    if(params === undefined || typeof params === 'string'){
      message = 'El pedido ingresado no existe'
    } else {
      message = 'No se ha encontrado ningún pedido'
    }
    super(message);
    this.name = 'PedidoNotFoundError'
  }
}

export class PedidoPreconditionFailed extends Error {
  constructor(message: string = 'No se puede crear un pedido si no hay clientes y/o mesas registradas') {
    super(message);
    this.name = 'PedidoPreconditionFailed'
  }
}