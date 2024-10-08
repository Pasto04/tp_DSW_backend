import { BeforeCreate, DateType, Entity, Index, ManyToOne, PrimaryKeyType, Property, Rel, TimeType } from "@mikro-orm/core";
import { Pedido } from "../../pedido/pedido.entity.js";
import { Plato } from "../plato.entity.js";

@Index({properties: ['pedido', 'plato', 'fechaSolicitud', 'horaSolicitud']})
@Entity()
export class PlatoPedido {

  [PrimaryKeyType]?: [number, number]

  @ManyToOne(() => Pedido, {primary: true, nullable: false})
  pedido!: Rel<Pedido>

  @ManyToOne(() => Plato, {primary: true, nullable: false})
  plato!: Rel<Plato>

  @Property({ nullable: false, primary: true, type: DateType })
  fechaSolicitud?: Date

  @Property({ nullable: false, primary: true, type: TimeType })
  horaSolicitud?: string

  @Property({ nullable: false })
  cantidad!: number

  @Property({ nullable: true, type: DateType })
  fechaEntrega?: Date

  @Property({ nullable: true, type: TimeType })
  horaEntrega?: string

  @Property()
  entregado?: boolean = false

  establecerFechaYHoraEntrega() {
    this.fechaEntrega = new Date()
    this.horaEntrega = (new Date()).toTimeString().split(' ')[0]
  }

  @BeforeCreate()
  establecerFechaYHora() {
    this.fechaSolicitud = new Date()
    this.horaSolicitud = (new Date()).toTimeString().split(' ')[0]
  }
} 