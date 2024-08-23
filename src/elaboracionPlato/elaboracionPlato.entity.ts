import { Entity, ManyToOne, PrimaryKeyType, Property, Rel } from "@mikro-orm/core";
import { Plato } from "../plato/plato.entity.js";
import { IngredienteDeProveedor } from "../ingredienteDeProveedor/ingredienteDeProveedor.entity.js";

@Entity()
export class ElaboracionPlato {

  @ManyToOne(() => IngredienteDeProveedor, {primary: true})
  ingredienteDeProveedor!: Rel<IngredienteDeProveedor>

  @ManyToOne(() => Plato, {primary: true})
  plato!: Rel<Plato>

  @Property()
  fechaVigencia!: string

  @Property()
  cantidadNecesaria!: number

  [PrimaryKeyType]?: [number, number]
} 