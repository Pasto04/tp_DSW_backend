import { Entity, Property, Rel, ManyToOne, OneToOne, Index, PrimaryKeyType, BeforeCreate, DateType, TimeType, FloatType } from 
'@mikro-orm/core'
import { Pedido } from '../pedido.entity.js'
import { TarjetaCliente } from '../../tarjetaCliente/tarjetaCliente.entity.js'

@Index({properties: ['pedido']})
@Entity()
export class Pago {

  @OneToOne(() => Pedido, { primary: true })
  pedido!: Rel<Pedido>;

  @Property({ nullable: false })
  idPago!: string

  @Property({ nullable: false, type: DateType })
  fechaPago?: Date

  @Property({ nullable: false, type: TimeType })
  horaPago?: string

  @Property({ nullable: false, type: FloatType })
  importe!: number

  @ManyToOne(() => TarjetaCliente, { nullable: false })
  tarjetaCliente?: Rel<TarjetaCliente>

  [PrimaryKeyType]?: [number]

  @BeforeCreate()
  establecerFechaYHora() {
    this.fechaPago = new Date()
    this.horaPago = (new Date()).toTimeString().split(' ')[0]
  }
}