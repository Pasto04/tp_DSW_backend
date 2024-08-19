import { Entity, Property, ManyToOne, OneToMany, Cascade, Rel, Collection } from '@mikro-orm/core'
import { TipoPlato } from './tipoPlato.entity.js'
import { BaseClass1 } from '../shared/db/baseEntity.entity.js'


@Entity()
export class Plato extends BaseClass1 {

  @Property({nullable:false})
  descripcion!: string

  @Property({nullable:false})
  tiempo!: number

  @ManyToOne(() => TipoPlato, {nullable: false})
  tipoPlato!: Rel<TipoPlato>

}
