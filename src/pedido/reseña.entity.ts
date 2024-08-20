import { Entity, Property, OneToOne, Collection, Cascade } from "@mikro-orm/core";
import { Pedido } from "./pedido.entity.js";

@Entity()
export class Reseña{

  @Property({nullable: false})
  fechaReseña!: Date

  @Property({nullable: false})
  cuerpo!: string

  @Property({nullable: false})
  puntaje!: number

  @OneToOne(() => Pedido, (pedido) => pedido.reseña, {cascade: [Cascade.ALL]})
  pedido?: Pedido;
}