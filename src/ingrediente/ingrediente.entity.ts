import crypto from 'node:crypto'
import { TipoIngrediente } from '../tipoIngrediente/tipoIngrediente.entity.js'

export class Ingrediente {
  constructor(
    public codIngrediente = crypto.randomUUID(),
    public descIngrediente: string,
    public stockIngrediente: number,
    public puntoPedido: number,
    public tipoIngrediente: TipoIngrediente 
  ) {}
}