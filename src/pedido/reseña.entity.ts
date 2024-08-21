import { Entity, Property, OneToOne, Collection, Cascade, Rel, PrimaryKeyType } from "@mikro-orm/core";
import { Pedido } from "./pedido.entity.js";

@Entity()
export class Reseña{

  @Property({nullable: false, primary: true})
  fechaReseña!: Date

  @Property({nullable: false})
  cuerpo!: string

  @Property({nullable: false})
  puntaje!: number

  @OneToOne(() => Pedido, {cascade: [Cascade.ALL]})
  pedido?: Rel<Pedido>;

  [PrimaryKeyType]?: [number, Date]
}