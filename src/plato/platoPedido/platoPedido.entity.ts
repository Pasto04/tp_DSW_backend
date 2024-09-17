import { Cascade, Entity, ManyToOne, PrimaryKeyType, Property, Rel } from "@mikro-orm/core";
import { Pedido } from "../../pedido/pedido.entity.js";
import { Plato } from "../plato.entity.js";

@Entity()
export class PlatoPedido {

  @ManyToOne(() => Pedido, {primary: true, nullable: false})
  pedido!: Rel<Pedido>

  @ManyToOne(() => Plato, {primary: true, nullable: false})
  plato!: Rel<Plato>

  @Property({ nullable: false, primary: true })
  fechaSolicitud!: string

  @Property({ nullable: false, primary: true, type: 'time' })
  horaSolicitud!: string

  @Property({ nullable: false })
  cantidad!: number

  @Property({ nullable: false })
  entregado!: boolean

  [PrimaryKeyType]?: [number, number]
} 