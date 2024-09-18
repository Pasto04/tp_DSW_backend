import { NotFoundError } from "@mikro-orm/core";

export class ElaboracionPlatoNotFoundError extends NotFoundError {
  constructor(message: string = 'Elaboración de plato no encontrada') {
    super(message);
    this.name = 'ElaboracionPlatoNotFoundError';
  }
}