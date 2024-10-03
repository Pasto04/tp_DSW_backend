import { Loaded } from '@mikro-orm/core'

function validarFindAll(objects: Loaded<any, never>, errorClass: any) {
  if (objects.length === 0) {
    throw new errorClass(objects)
  }
  return objects
}

export { validarFindAll }