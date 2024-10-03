import { Entity, Index, ManyToOne, PrimaryKeyType, Property, Rel, Unique } from "@mikro-orm/core";
import { Ingrediente } from "../ingrediente.entity.js";
import { Proveedor } from "../../proveedor/proveedor.entity.js";


@Entity()
@Index({properties: ['ingrediente', 'proveedor']})
@Unique({properties: ['ingrediente', 'proveedor']})
export class IngredienteDeProveedor {

  @ManyToOne(() => Ingrediente, {nullable: false, primary: true})
  ingrediente!: Rel<Ingrediente>

  @ManyToOne(() => Proveedor, {nullable: false, primary: true})
  proveedor!: Rel<Proveedor>
  
  [PrimaryKeyType]?: [number, number] 
}