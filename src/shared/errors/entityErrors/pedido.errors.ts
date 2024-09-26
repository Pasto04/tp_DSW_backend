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

export class PedidoAlreadyInUseError extends Error {
  type: string
  constructor(message: string = 'Ya se han entregado bebidas y/o platos a este pedido, por lo que no puede ser eliminado (y será pagado)') {
    super(message);
    this.type = 'PedidoAlreadyInUseError'
  }
}

export class PedidoAlreadyExistsError extends Error {
  type: string
  constructor(message: string = 'Ya existe un pedido en curso, por lo que no puede crearse un nuevo pedido') {
    super(message)
    this.type = 'PedidoAlreadyExistsError'
  }
}

export class PedidoAlreadyEndedError extends Error {
  type: string
  constructor(message: string = 'El pedido ya ha finalizado o ha sido cancelado, por lo que no puede ser actualizado') {
    super(message)
    this.type = 'PedidoAlreadyEndedError'
  }
}

export class PedidoUniqueConstraintViolationError extends Error {
  type: string
  constructor(message: string = 'No puede ingresar de forma separada un mismo plato o bebida. Dado un producto, ingrese la cantidad que quiere del mismo. Si más tarde quiere ordenarlo nuevamente, puede hacerlo sin problemas.') {
    super(message)
    this.type = 'PedidoUniqueConstraintViolationError'
  }
}