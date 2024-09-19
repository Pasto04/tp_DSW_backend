import { NotFoundError } from "@mikro-orm/core";

export class BebidaNotFoundError extends NotFoundError {
  constructor(message?: string) 
  constructor(params: string | undefined | any) {
    let message
    if (params === undefined || typeof params === 'string') {
      message = 'La bebida ingresada no existe'
    } else {
      message = 'No se ha encontrado ninguna bebida'
    }
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

export class BebidaBadRequest extends Error {
  constructor(message: string = 'No se puede crear una bebida sin proveedor') {
    super(message);
    this.name = 'BebidaBadRequest'
  }
}