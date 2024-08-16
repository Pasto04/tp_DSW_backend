import { Cascade, Entity, ManyToOne, Property, Rel } from "@mikro-orm/core";
import { BaseClass } from "../shared/db/baseEntity.entity.js";
import { Ingrediente } from "../ingrediente/ingrediente.entity.js";
import { Plato } from "../plato/plato.entity.js";

@Entity()
export class ElaboracionPlato extends BaseClass {

  @ManyToOne(() => Ingrediente)
  ingrediente!: Rel<Ingrediente>

  @ManyToOne(() => Plato)
  plato!: Rel<Plato>

  @Property()
  fechaVigencia!: string

  @Property()
  cantidadNecesaria!: number
} 