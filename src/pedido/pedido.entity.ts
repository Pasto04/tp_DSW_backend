import crypto from 'node:crypto'
import { Cliente } from '../cliente/cliente.entity.js'

export class Pedido{
  constructor(
    public estado: string,
    public fecha: Date,
    public hora: Date,
    public nroMesa: number,
    public nroPed = crypto.randomUUID(),
    public cliente = Cliente,
  ){}
}