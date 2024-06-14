import crypto from 'node:crypto'

export class Ingrediente {
  constructor(
    public codIngrediente = crypto.randomUUID(),
    public descIngrediente: string,
    public stockIngrediente: number,
    public puntoPedido: number,
    public tipoIngrediente: `${string}-${string}-${string}-${string}-${string}` //¿Es correcto este planteo?
  ) {}
}