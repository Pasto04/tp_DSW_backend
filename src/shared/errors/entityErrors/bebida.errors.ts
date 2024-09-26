import { NotFoundError } from "@mikro-orm/core";

export class BebidaNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | undefined | object) {
    let message
    if (params === undefined || typeof params === 'string') {
      message = 'La bebida ingresada no existe'
    } else {
      message = 'No se ha encontrado ninguna bebida'
    }
    super(message);
    this.type = 'BebidaNotFoundError'
  }
}

export class BebidaPreconditionFailed extends Error {
  type: string
  constructor(message: string = 'No se puede crear una bebida si no hay proveedores registrados') {
    super(message);
    this.type = 'BebidaPreconditionFailed'
  }
}

export class BebidaUniqueConstraintViolation extends Error {
  type: string
  constructor(message: string = 'Ya existe una bebida con ese nombre') {
    super(message);
    this.type = 'BebidaUniqueConstraintViolation'
  }
}

export class BebidaBadRequest extends Error {
  type: string
  constructor(message: string = 'No se puede crear una bebida sin proveedor') {
    super(message);
    this.type = 'BebidaBadRequest'
  }
}

export class ProveedorIsUniqueForBebidaError extends Error {
  type: string
  constructor(message: string = 'Existe al menos una bebida cuyo único proveedor es el que usted desea eliminar, por lo que la acción no fue posible') {
    super(message)
    this.type = 'ProveedorIsUniqueForBebidaError'
  }
}

export class BebidaUnidadMedidaTypeError extends Error {
  type: string
  constructor (message: string = 'La unidad de medida puede ser -litros- o -mililitros-') {
    super(message)
    this.type = 'BebidaUnidadMedidaTypeError'
  }
}