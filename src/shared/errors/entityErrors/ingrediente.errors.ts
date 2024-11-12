import { NotFoundError } from "@mikro-orm/core"

export class IngredienteNotFoundError extends NotFoundError {
  type: string
  constructor(message?: string)
  constructor(array: object)
  constructor(params: string | undefined | object) {
    let message
    if (params === undefined) {
      message = 'El ingrediente ingresado no existe'

    } else if(typeof params !== 'string') {
      message = 'No se han encontrado ingredientes'
      
    } else {
      message = params
    }
    super(message)
    this.type = 'IngredienteNotFoundError'
  }
}

export class IngredientePreconditionFailed extends Error {
  type: string
  constructor(message: string = 'No se puede crear un ingrediente si no hay proveedores registrados') {
    super(message)
    this.type = 'IngredientePreconditionFailed'
  }
}

export class IngredienteUniqueConstraintViolation extends Error {
  type: string
  constructor(message: string = 'Ya existe una ingrediente con ese nombre') {
    super(message)
    this.type = 'IngredienteUniqueConstraintViolation'
  }
}

export class IngredienteUnidadMedidaTypeError extends Error {
  type: string
  constructor (message: string = 'La unidad de medida puede ser -kilogramos-, -gramos-, -litros-, -mililitros- o -unidades-') {
    super(message)
    this.type = 'IngredienteUnidadMedidaTypeError'
  }
}

export class IngredienteHasNoProveedor extends Error {
  type: string
  constructor (message: string = 'No se puede crear un ingrediente sin un proveedor') {
    super(message)
    this.type = 'IngredienteHasNoProveedor' 
  }
}

export class IngredienteAlreadyInUseError extends Error {
  type: string
  constructor(message: string = 'Ya existe un plato que utiliza este ingrediente, por lo que no puede eliminarse') {
    super(message)
    this.type = 'IngredienteAlreadyInUseError'
  }
}