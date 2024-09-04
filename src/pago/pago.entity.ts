import { Entity, Property, ManyToMany, Cascade, Rel, Collection, ManyToOne, OneToOne } from '@mikro-orm/core'
import { BaseClass5 } from '../shared/db/baseEntity.entity.js'
import { Pedido } from '../pedido/pedido.entity.js'

@Entity()
export class Pago extends BaseClass5 {
  @Property()
  fehcaPago!: Date

  @Property()
  horaPago!: String

  @Property()
  importe!: number

  @OneToOne(() => Pedido, (pedido) => pedido.pago, { owner: true })
  pedido!: Pedido;

}