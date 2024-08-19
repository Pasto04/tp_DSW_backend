import { Cascade, Entity, ManyToOne, PrimaryKeyType, Property, Rel } from "@mikro-orm/core";
import { BaseClass3 } from "../shared/db/baseEntity.entity.js";
import { Pedido } from "../pedido/pedido.entity.js";
import { Plato } from "../plato/plato.entity.js";

@Entity()
export class PlatoPedido {

  @ManyToOne(() => Pedido, {primary: true})
  pedido!: Rel<Pedido>

  @ManyToOne(() => Plato, {primary: true})
  plato!: Rel<Plato>

  @Property()
  cantidad!: number

  [PrimaryKeyType]?: [number, number]
} 