import { NotFoundError } from "@mikro-orm/core";

export class UsuarioNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: object | string | undefined) {
    let message
    if (params === undefined) {
      message = 'El usuario ingresado no existe'

    } else if(typeof params !== 'string') {
      message = 'No se ha encontrado ningún usuario'
      
    } else {
      message = params
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

export class UsuarioIsNotAllowedError extends Error {
  type: string
  constructor(message: string = 'No tiene permisos para realizar esta acción') {
    super(message)
    this.type = 'UsuarioIsNotAllowedError'
  }
}

export class UsuarioUnauthorizedError extends Error {
  type: string
  constructor(message: string = 'Primero debe iniciar sesión para acceder a este recurso') {
    super(message)
    this.type = 'UsuarioUnauthorizedError'
  }
}

export class ClienteAlreadyHasPedido extends Error {
  type: string
  constructor(message: string = 'El cliente ya ha realizado al menos un pedido, por lo que no puede ser eliminado.') {
    super(message)
    this.type = 'ClienteAlreadyHasPedido'
  }
}

export class UsuarioBadRequestError extends Error {
  type: string
  constructor(message: string) {
    super(message)
    this.type = 'UsuarioBadRequestError'
  }
}

export class UsuarioWrongRole extends Error {
  type: string
  constructor(message: string = 'El rol del usuario debe ser "cliente" o "empleado"') {
    super(message)
    this.type = 'UsuarioWrongRole'
  }
}