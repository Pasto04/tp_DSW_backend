import { Entity, Property, Collection, OneToMany } from "@mikro-orm/core";
import { BaseClass2 } from "../shared/db/baseEntity.entity.js";
import { IngredienteDeProveedor } from "../ingredienteDeProveedor/ingredienteDeProveedor.entity.js";


@Entity()
export class Proveedor extends BaseClass2 {

  @Property({nullable: false, unique: true})
  cuit!: string

  @Property({nullable: false, unique: true})
  razonSocial!: string

  @Property({nullable: false})
  direccion!: string

  @Property({nullable: false})
  ciudad!: string

  @Property({nullable: false})
  provincia!: string

  @Property({nullable: false})
  pais!: string

  @Property({nullable: false, unique: true})
  telefono!: string

  @Property({nullable: false, unique: true})
  email!: string

  @OneToMany(() => IngredienteDeProveedor, (ingredienteDeProveedor) => ingredienteDeProveedor.proveedor) 
  ingredienteDeProveedor = new Collection<IngredienteDeProveedor>(this)
  
}