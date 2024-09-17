import { Entity, Index, ManyToOne, PrimaryKeyType, Property, Rel, TimeType, Unique } from "@mikro-orm/core";
import { Bebida } from "../bebida.entity.js";
import { Pedido } from "../../pedido/pedido.entity.js";

@Index({properties: ['bebida', 'pedido']})
@Unique({properties: ['bebida', 'pedido']})
@Entity()
export class BebidaPedido {

  @ManyToOne(() => Bebida, { nullable: false, primary: true })
  bebida!: Rel<Bebida>

  @ManyToOne(() => Pedido, { nullable: false, primary: true })
  pedido!: Rel<Pedido>

  @Property({ nullable: false })
  fechaSolicitud!: Date

  @Property({ nullable: false, type: 'time' })
  horaSolicitud!: string

  @Property({ nullable: false })
  cantidad!: number

  @Property({ nullable: false })
  entregado!: boolean

  [PrimaryKeyType]?: [number, number]
}