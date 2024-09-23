import { NotFoundError } from "@mikro-orm/core";

export class UsuarioNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: object | string | undefined) {
    let message
    if (params === undefined || typeof params === 'string') {
      message = 'El usuario ingresado no existe'
    } else {
      message = 'No se ha encontrado ningún usuario'
    }
    super(message);
    this.type = 'UsuarioNotFoundError'
  }
}

export class UsuarioUniqueConstraintViolation extends Error {
  type: string
  constructor(message: string = 'Ya existe un usuario con ese email'){
    super(message)
    this.type = 'UsuarioUniqueConstraintViolation'
  }
}