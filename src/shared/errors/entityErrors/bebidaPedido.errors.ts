import { NotFoundError } from '@mikro-orm/core';

export class BebidaPedidoNotFoundError extends NotFoundError {
  type: string;
  constructor(message?: string);
  constructor(array: object);
  constructor(params: string | object | undefined) {
    let message;
    if (params === undefined) {
      message = 'La bebida del pedido ingresado no existe';
    } else if (typeof params !== 'string') {
      message = 'No se han encontrado bebidas del pedido';
    } else {
      message = params;
    }
    super(message);
    this.type = 'BebidaPedidoNotFoundError';
  }
}

export class BebidaPedidoAlreadyDeliveredError extends Error {
  type: string;
  constructor(message: string = 'La bebida ya ha sido entregada') {
    super(message);
    this.type = 'BebidaPedidoAlreadyDeliveredError';
  }
}

export class BebidaPedidoNotEnoughStockError extends Error {
  type: string;
  constructor(message: string = 'No hay suficiente stock de la bebida') {
    super(message);
    this.type = 'BebidaPedidoNotEnoughStockError';
  }
}
