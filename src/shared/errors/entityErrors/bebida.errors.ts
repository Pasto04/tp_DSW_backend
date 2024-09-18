import { NotFoundError } from "@mikro-orm/core";

export class BebidaNotFoundError extends NotFoundError {
  constructor(message: string = 'La bebida ingresada no existe') {
    super(message);
    this.name = 'BebidaNotFoundError'
  }
}

export class BebidaPreconditionFailed extends Error {
  constructor(message: string = 'No se puede crear una bebida si no hay proveedores registrados') {
    super(message);
    this.name = 'BebidaPreconditionFailed'
  }
}

export class BebidaUniqueConstraintViolation extends Error {
  constructor(message: string = 'Ya existe una bebida con ese nombre') {
    super(message);
    this.name = 'BebidaUniqueConstraintViolation'
  }
}