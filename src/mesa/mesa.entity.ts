import { Entity, Property, ManyToMany, Cascade, Rel, Collection, ManyToOne } from '@mikro-orm/core'
import { BaseClass4 } from '../shared/db/baseEntity.entity.js'
import { Pedido } from '../pedido/pedido.entity.js'

@Entity()
export class Mesa extends BaseClass4 {
  @Property()
  cantPersonasMax!: number 

  @Property()
  estado!: string

  @ManyToMany(() => Pedido, pedido => pedido.mesa, { cascade: [Cascade.ALL] })
  pedidos = new Collection<Pedido>(this);
}