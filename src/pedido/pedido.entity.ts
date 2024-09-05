import { Entity, Property, ManyToOne, OneToMany, Cascade, Rel, Collection, OneToOne, ManyToMany } from '@mikro-orm/core'
import { BaseClass3 } from '../shared/db/baseEntity.entity.js'
import { Resena } from './reseña.entity.js'
import { Cliente } from '../cliente/cliente.entity.js'
import { PlatoPedido } from '../platoPedido/platoPedido.entity.js'
import { Mesa } from '../mesa/mesa.entity.js'
import { Pago } from '../pago/pago.entity.js'
import { BebidaPedido } from '../bebida/bebidaPedido.entity.js'

@Entity()
export class Pedido extends BaseClass3 {
  
  @Property({ nullable: false })
  estado!: string 

  @Property({ nullable: false })
  fecha!: string

  @Property({ nullable: false, type: 'time' })
  hora!: string

  @Property({ nullable: true })
  fechaCancelacion?: string

  @Property({ nullable: true, type: 'time' })
  horaCancelacion?: string

  @ManyToOne(() => Cliente, {nullable: false})
  cliente!: Rel<Cliente>

  @ManyToOne(() => Mesa, { nullable: false })
  mesa!: Rel<Mesa>

  @OneToMany(() => PlatoPedido, (platoPedido) => platoPedido.pedido)
  platoPedidos = new Collection<PlatoPedido>(this)

  @OneToMany(() => BebidaPedido, (bebidaPedido) => bebidaPedido.pedido)
  bebidaPedidos = new Collection<BebidaPedido>(this)

  @OneToOne(() => Pago, (pago) => pago.pedido, { nullable: true })
  pago?: Rel<Pago>

  @OneToOne(()=> Resena, (resena) => resena.pedido, {nullable: true})
  resena?: Rel<Resena>



}