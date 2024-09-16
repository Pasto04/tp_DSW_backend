import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseClass7 } from '../shared/db/baseEntity.entity.js'
import { BebidaPedido } from "./bebidaPedido.entity.js";
import { BebidaDeProveedor } from "../bebidaDeProveedor/bebidaDeProveedor.entity.js";


@Entity()
export class Bebida extends BaseClass7 {

  @Property({ nullable: false })
  descripcion!: string

  @Property({ nullable: false })
  unidadMedida!: string

  @Property({ nullable: false })
  contenido!: number

  @OneToMany(() => BebidaPedido, (bebidaPedido) => bebidaPedido.bebida)
  bebidasPedido = new Collection<BebidaPedido>(this)

  @OneToMany(() => BebidaDeProveedor, (bebidaDeProveedor) => bebidaDeProveedor.bebida)
  bebidasDeProveedor = new Collection<BebidaPedido>(this)
}