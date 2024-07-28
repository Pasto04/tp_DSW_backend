import { Entity, Property, ManyToOne, Cascade, Rel } from '@mikro-orm/core'
import { TipoIngrediente } from '../tipoIngrediente/tipoIngrediente.entity.js'
import { BaseClass } from '../shared/db/baseEntity.entity.js'

@Entity()
export class Ingrediente extends BaseClass {

  @Property()
  descripcion!: string

  @Property()
  stock!: number

  @Property()
  puntoDePedido!: number

  @ManyToOne(() => TipoIngrediente, {nullable: false})
  tipoIngrediente!: Rel<TipoIngrediente>
}