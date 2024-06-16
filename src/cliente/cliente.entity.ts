import crypto from 'node:crypto'

export class Cliente{
  constructor(
    public nombre: string,
    public apellido: string,
    public mail: string,
    public telefono: number,
    public id = crypto.randomUUID()
  ){}
}