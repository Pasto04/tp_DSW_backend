import { NotFoundError } from "@mikro-orm/core";

export class IngredienteNotFoundError extends NotFoundError {
  constructor(message?: string)
  constructor(params: string | undefined | any) {
    let message
    if (typeof params === 'string' || params === undefined) {
      message = 'El ingrediente ingresado no existe'
    } else {
      message = 'No se han encontrado ingredientes'
    }
    super(message)
    this.name = 'IngredienteNotFoundError'
  }
}

export class IngredientePreconditionFailed extends Error {
  constructor(message: string = 'No se puede crear un ingrediente si no hay proveedores registrados') {
    super(message)
    this.name = 'IngredientePreconditionFailed'
  }
}

export class IngredienteUniqueConstraintViolation extends Error {
  constructor(message: string = 'Ya existe una ingrediente con ese nombre') {
    super(message)
    this.name = 'IngredienteUniqueConstraintViolation'
  }
}

export class IngredienteUnidadMedidaTypeError extends Error {
  constructor (message: string = 'La unidad de medida puede ser -kg-, -g-, -l-, -ml- o -unidades-') {
    super(message)
    this.name = 'IngredienteUnidadMedidaTypeError'
  }
}

export class IngredienteBadRequest extends Error {
  constructor (message: string = 'No se puede crear un ingrediente sin un proveedor') {
    super(message)
    this.name = 'IngredienteBadRequest' 
  }
}