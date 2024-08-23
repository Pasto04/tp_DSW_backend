import { Cascade, Collection, Entity, Index, ManyToOne, OneToMany, Property, Rel, Unique } from "@mikro-orm/core";
import { Ingrediente } from "../ingrediente/ingrediente.entity.js";
import { Proveedor } from "../proveedor/proveedor.entity.js";
import { ElaboracionPlato } from "../elaboracionPlato/elaboracionPlato.entity.js";


@Entity()
@Index({properties: ['ingrediente', 'proveedor']})
@Unique({properties: ['ingrediente', 'proveedor']})
export class IngredienteDeProveedor {

  @ManyToOne(() => Ingrediente, {nullable: false, primary: true})
  ingrediente!: Rel<Ingrediente>

  @ManyToOne(() => Proveedor, {nullable: false, primary: true})
  proveedor!: Rel<Proveedor>

  @Property()
  stock!: number
  
  @OneToMany(() => ElaboracionPlato, (elaboracionPlato) => elaboracionPlato.ingredienteDeProveedor, {cascade: [Cascade.ALL]})
  elaboracionesPlato = new Collection<ElaboracionPlato>(this)
}