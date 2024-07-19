import crypto from 'node:crypto'
import { TipoPlato } from '../tipoplato/tipoplato.entity.js'

export class Plato{
  constructor(
    public nro = crypto.randomUUID(),
    public platoClass: TipoPlato,
    public descripcion: string,
    public tiempo: number,
  ){}
}