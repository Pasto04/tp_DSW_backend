import { BeforeCreate, Cascade, Entity, Index, ManyToOne, PrimaryKeyType, Property, Rel } from "@mikro-orm/core";
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

  @Property({ nullable: false, primary: true })
  fechaSolicitud?: string

  @Property({ nullable: false, primary: true, type: 'time' })
  horaSolicitud?: string

  @Property({ nullable: false })
  cantidad!: number

  @Property()
  entregado?: boolean = false

  @BeforeCreate()
  establecerFechaYHora() {
    this.fechaSolicitud = (new Date()).toDateString()
    this.horaSolicitud = (new Date()).toTimeString().split(' ')[0]
  }
} 