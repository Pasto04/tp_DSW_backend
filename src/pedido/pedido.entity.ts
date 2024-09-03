import { Entity, Property, ManyToOne, OneToMany, Cascade, Rel, Collection, OneToOne, ManyToMany } from '@mikro-orm/core'
import { BaseClass3 } from '../shared/db/baseEntity.entity.js'
import { Resena } from './reseña.entity.js'
import { Cliente } from '../cliente/cliente.entity.js'
import { PlatoPedido } from '../platoPedido/platoPedido.entity.js'
import { Mesa } from '../mesa/mesa.entity.js'
import { Pago } from '../pago/pago.entity.js'

@Entity()
export class Pedido extends BaseClass3 {

  @Property()
  estado!: string 

  @Property()
  fecha!: Date

  @Property()
  hora!: Date

  @Property({nullable:true})
  fechaCancelacion?: Date

  @Property({nullable:true})
  horaCancelacion?: Date

  @OneToMany(() => PlatoPedido, (platoPedido) => platoPedido.pedido)
  platoPedidos = new Collection<PlatoPedido>(this)

  @OneToOne(()=> Resena, (resena) => resena.pedido, {nullable: true, owner: true})
  resena?: Rel<Resena>

  @ManyToOne(() => Cliente, {nullable: false})
  cliente!: Rel<Cliente>

  @ManyToMany(() => Mesa)
  mesa!: Rel<Mesa>

  @OneToOne(() => Pago, (pago) => pago.pedido, { cascade: [Cascade.ALL], nullable: true })
  pago?: Pago;
  /*
  @Unique()
  
  */

}