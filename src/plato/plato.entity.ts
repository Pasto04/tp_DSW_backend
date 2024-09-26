import { Entity, Property, ManyToOne, OneToMany, Cascade, Rel, Collection, FloatType } from '@mikro-orm/core'
import { TipoPlato } from './tipoPlato.entity.js'
import { BaseClass1 } from '../shared/db/baseEntity.entity.js'
import { ElaboracionPlato } from './elaboracionPlato/elaboracionPlato.entity.js'
import { PlatoPedido } from './platoPedido/platoPedido.entity.js'


@Entity()
export class Plato extends BaseClass1 {

  @Property({nullable:false, unique: true})
  descripcion!: string

  @Property({nullable:false})
  tiempo!: number

  @Property({nullable:false, type: FloatType})
  precio!: number

  @Property()
  aptoCeliacos!: boolean

  @Property()
  aptoVegetarianos!: boolean

  @Property()
  aptoVeganos!: boolean

  @ManyToOne(() => TipoPlato, {nullable: false})
  tipoPlato!: Rel<TipoPlato>

  @OneToMany(() => ElaboracionPlato, (elaboracionPlato) => elaboracionPlato.plato, {cascade: [Cascade.ALL]})
  elaboracionesPlato = new Collection<ElaboracionPlato>(this)

  @OneToMany(() => PlatoPedido, (platoPedido) => platoPedido.plato)
  platoPedidos = new Collection<PlatoPedido>(this)
}
