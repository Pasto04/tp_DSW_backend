import crypto from 'node:crypto'


export class TipoPlato{
  constructor(
    public name: string,
    public tipoplatoClass: string,
    public level: number,
    public hp: number,
    public mana: number,
    public attack: number,
    //public items: string[],
    public id= crypto.randomUUID()
  ){}
}