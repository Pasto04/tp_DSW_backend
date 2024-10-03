import { Entity, Property, ManyToMany, Collection, OneToMany} from '@mikro-orm/core'
import { BaseClass4 } from '../shared/db/baseEntity.entity.js'
import { Pedido } from '../pedido/pedido.entity.js'

@Entity()
export class Mesa extends BaseClass4 {
  @Property({nullable: false})
  cantPersonasMax!: number 

  @Property({nullable: false})
  estado!: string

  @Property({nullable: true})
  codigo?: string

  @OneToMany(() => Pedido, pedido => pedido.mesa)
  pedidos = new Collection<Pedido>(this);
}