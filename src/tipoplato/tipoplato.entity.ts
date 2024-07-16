import crypto from 'node:crypto'


export class TipoPlato{
  constructor(
    public descripcion: string,
    public id= crypto.randomUUID()
  ){}
}