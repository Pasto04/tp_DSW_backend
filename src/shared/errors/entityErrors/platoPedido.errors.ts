import { NotFoundError } from '@mikro-orm/core';

export class PlatoPedidoNotFoundError extends NotFoundError {
  type: string;
  constructor(message?: string);
  constructor(array: object);
  constructor(params: string | undefined | object) {
    let message;
    if (params === undefined) {
      message = 'El plato ingresado no se encuentra en el pedido';
    } else if (typeof params !== 'string') {
      message = 'No se han encontrado platos de pedido';
    } else {
      message = params;
    }
    super(message);
    this.type = 'PlatoPedidoNotFoundError';
  }
}

export class PlatoPedidoAlreadyDeliveredError extends Error {
  type: string;
  constructor(message: string = 'El plato ya ha sido entregado') {
    super(message);
    this.type = 'PlatoPedidoAlreadyDeliveredError';
  }
}

export class PlatoPedidoNotEnoughIngredientsError extends Error {
  type: string;
  constructor(
    message: string = 'No hay suficientes ingredientes para preparar el plato'
  ) {
    super(message);
    this.type = 'PlatoPedidoNotEnoughIngredientsError';
  }
}
