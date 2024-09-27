import { Entity, Property, ManyToOne, OneToMany, Rel, Collection, OneToOne, BeforeCreate, BeforeUpdate, DateType, TimeType } from '@mikro-orm/core'
import { BaseClass3 } from '../shared/db/baseEntity.entity.js'
import { Resena } from './reseña.entity.js'
import { Usuario } from '../usuario/usuario.entity.js'
import { PlatoPedido } from '../plato/platoPedido/platoPedido.entity.js'
import { Mesa } from '../mesa/mesa.entity.js'
import { Pago } from './pago/pago.entity.js'
import { BebidaPedido } from '../bebida/bebidaPedido/bebidaPedido.entity.js'

@Entity()
export class Pedido extends BaseClass3 {
  
  @Property({ nullable: false })
  estado: string = 'en curso'

  @Property({ nullable: false, type: DateType})
  fecha?: Date

  @Property({ nullable: false, type: TimeType })
  hora?: string

  @Property({ nullable: true, type: DateType })
  fechaCancelacion?: Date

  @Property({ nullable: true, type: TimeType })
  horaCancelacion?: string

  @ManyToOne(() => Usuario, {nullable: false})
  cliente!: Rel<Usuario>

  @ManyToOne(() => Mesa, { nullable: false })
  mesa!: Rel<Mesa>

  @OneToMany(() => PlatoPedido, (platoPedido) => platoPedido.pedido)
  platosPedido = new Collection<PlatoPedido>(this)

  @OneToMany(() => BebidaPedido, (bebidaPedido) => bebidaPedido.pedido)
  bebidasPedido = new Collection<BebidaPedido>(this)

  @OneToOne(() => Pago, { inversedBy: (pago) => pago.pedido,  nullable: true })
  pago?: Rel<Pago>

  @OneToOne(()=> Resena, { inversedBy: (resena) => resena.pedido,  nullable: true })
  resena?: Rel<Resena>

  establecerFechaYHoraCancelacion() {
    this.fechaCancelacion = new Date()
    this.horaCancelacion = (new Date()).toTimeString().split(' ')[0]
  }

  @BeforeCreate()
  establecerFechaYHora() {
    this.fecha = new Date()
    this.hora = (new Date()).toTimeString().split(' ')[0]
  }
}