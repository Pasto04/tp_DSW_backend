import { Entity, Property, ManyToOne, OneToMany, Cascade, Rel, Collection } from '@mikro-orm/core'
import { BaseClass } from '../shared/db/baseEntity.entity.js'
import { ElaboracionPlato } from '../elaboracionPlato/elaboracionPlato.entity.js'

@Entity()
export class Ingrediente extends BaseClass {

  @Property()
  descIngre!: string

  @Property()
  puntoDePedido!: number

  @Property()
  unidadMedida!: string

  @Property()
  fechaVencimiento!: Date

  @Property()
  aptoCeliacos!: boolean

  @Property()
  aptoVegetarianos!: boolean

  @Property()
  aptoVeganos!: boolean

  @OneToMany(() => ElaboracionPlato, (elaboracionPlato) => elaboracionPlato.ingrediente, {cascade: [Cascade.ALL]})
  elaboracionesPlato = new Collection<ElaboracionPlato>(this)

  /*
  @OneToMany(() => IngredienteDeProveedor, (ingredienteDeProveedor) => ingredienteDeProveedor.ingrediente)
  ingredienteDeProveedor = new Collection<IngredienteDeProveedor>(this)
  */
}