import { Entity, Index, ManyToOne, PrimaryKeyType, Rel, Unique } from "@mikro-orm/core";
import { Bebida } from "../bebida/bebida.entity.js";
import { Proveedor } from "../proveedor/proveedor.entity.js";


@Entity()
@Index({properties: ['bebida', 'proveedor']})
@Unique({properties: ['bebida', 'proveedor']})
export class BebidaDeProveedor {

  @ManyToOne(() => Bebida, {nullable: false, primary: true})
  bebida!: Rel<Bebida>

  @ManyToOne(() => Proveedor, {nullable: false, primary: true})
  proveedor!: Rel<Proveedor>

  [PrimaryKeyType]?: [number, number]
}