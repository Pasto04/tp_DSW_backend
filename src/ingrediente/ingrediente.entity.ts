import { Entity, Property, ManyToOne, OneToMany, Cascade, Rel, Collection } from '@mikro-orm/core'
import { BaseClass } from '../shared/db/baseEntity.entity.js'
import { ElaboracionPlato } from '../elaboracionPlato/elaboracionPlato.entity.js'
import { IngredienteDeProveedor } from '../ingredienteDeProveedor/ingredienteDeProveedor.entity.js'

@Entity()
export class Ingrediente extends BaseClass {

  @Property({nullable: false, unique: true})
  descIngre!: string

  @Property({nullable: false})
  puntoDePedido!: number

  @Property({nullable: false})
  stock!: number

  @Property({nullable: false})
  unidadMedida!: string[]

  @Property({nullable: false})
  aptoCeliacos!: boolean

  @Property({nullable: false})
  aptoVegetarianos!: boolean

  @Property({nullable: false})
  aptoVeganos!: boolean

  @OneToMany(() => ElaboracionPlato, (elaboracionPlato) => elaboracionPlato.ingrediente, {cascade: [Cascade.ALL]})
  elaboracionesPlato = new Collection<ElaboracionPlato>(this)

  @OneToMany(() => IngredienteDeProveedor, (ingredienteDeProveedor) => ingredienteDeProveedor.ingrediente)
  ingredienteDeProveedor = new Collection<IngredienteDeProveedor>(this)
  
}