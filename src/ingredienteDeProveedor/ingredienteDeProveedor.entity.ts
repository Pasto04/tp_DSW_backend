import { Entity, ManyToOne, Property, Rel } from "@mikro-orm/core";
import { Ingrediente } from "../ingrediente/ingrediente.entity.js";
import { Proveedor } from "../proveedor/proveedor.entity.js";


@Entity()
export class IngredienteDeProveedor {

  @ManyToOne(() => Ingrediente, {nullable: false, primary: true})
  ingrediente!: Rel<Ingrediente>

  @ManyToOne(() => Proveedor, {nullable: false, primary: true})
  proveedor!: Rel<Proveedor>

  @Property()
  stock!: number
}