import { Entity, Index, ManyToOne, PrimaryKeyType, Property, Rel, Unique } from "@mikro-orm/core";
import { Plato } from "../plato/plato.entity.js";
import { Ingrediente } from "../ingrediente/ingrediente.entity.js";

@Entity()
@Index({properties: ['ingrediente', 'plato']})
@Unique({properties: ['ingrediente', 'plato']})
export class ElaboracionPlato {

  @ManyToOne(() => Ingrediente, {primary: true})
  ingrediente!: Rel<Ingrediente>

  @ManyToOne(() => Plato, {primary: true})
  plato!: Rel<Plato>

  @Property()
  fechaVigencia!: string

  @Property()
  cantidadNecesaria!: number

  [PrimaryKeyType]?: [number, number]
} 