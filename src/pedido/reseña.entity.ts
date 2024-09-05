import { Entity, Property, OneToOne, Collection, Cascade, Rel, PrimaryKeyType } from "@mikro-orm/core";
import { Pedido } from "./pedido.entity.js";

@Entity()
export class Resena {

  @OneToOne(() => Pedido, {primary: true, owner: true})
  pedido!: Rel<Pedido>

  @Property({primary: true})
  fechaResena!: Date

  @Property({nullable: false})
  cuerpo!: string

  @Property({nullable: false})
  puntaje!: number

  [PrimaryKeyType]?: [number, Date]
}