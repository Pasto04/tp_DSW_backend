import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseClass7 } from '../shared/db/baseEntity.entity.js'
import { BebidaPedido } from "./bebidaPedido.entity.js";


@Entity()
export class Bebida extends BaseClass7 {

  @Property({ nullable: false })
  descripcion!: string

  @Property({ nullable: false })
  unidadMedida!: string

  @Property({ nullable: false })
  contenido!: string

  @OneToMany(() => BebidaPedido, (bebidaPedido) => bebidaPedido.bebida)
  bebidasPedido = new Collection<BebidaPedido>(this)
}