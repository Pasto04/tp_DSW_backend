import { NotFoundError } from "@mikro-orm/core";

export class UsuarioNotFoundError extends NotFoundError {
  constructor(message?: string)
  constructor(params: any | string | undefined) {
    let message
    if (params === undefined || typeof params === 'string') {
      message = 'El usuario ingresado no existe'
    } else {
      message = 'No se ha encontrado ningún usuario'
    }
    super(message);
    this.name = 'UsuarioNotFoundError'
  }
}

export class UsuarioUniqueConstraintViolation extends Error {
  constructor(message: string = 'Ya existe un usuario con ese email'){
    super(message)
    this.name = 'UsuarioUniqueConstraintViolation'
  }
}