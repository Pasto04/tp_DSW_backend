import { Entity, Property, Rel, ManyToOne, OneToOne, Index, PrimaryKeyType, Unique } from '@mikro-orm/core'
import { Pedido } from '../pedido/pedido.entity.js'
import { TarjetaCliente } from '../tarjetaCliente/tarjetaCliente.entity.js'

@Index({properties: ['pedido', 'fechaPago', 'horaPago']})
@Entity()
export class Pago {

  @Property({ nullable: false })
  idPago!: string

  @Property({ nullable: false, primary: true })
  fechaPago!: string

  @Property({ nullable: false, type: 'time', primary: true })
  horaPago!: string

  @Property({ nullable: false })
  importe!: number

  @OneToOne(() => Pedido, { primary: true })
  pedido!: Rel<Pedido>;

  @ManyToOne(() => TarjetaCliente, { nullable: false })
  tarjetaCliente?: Rel<TarjetaCliente>

  [PrimaryKeyType]?: [number, number]
}