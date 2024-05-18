import crypto from 'node:crypto'

export class TipoIngrediente {
  constructor(
    public codigo = crypto.randomUUID(),
    public descripcion:string
  ) {}
}