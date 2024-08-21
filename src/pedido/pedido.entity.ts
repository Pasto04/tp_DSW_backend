import { Entity, Property, ManyToOne, OneToMany, Cascade, Rel, Collection, OneToOne } from '@mikro-orm/core'
import { BaseClass3 } from '../shared/db/baseEntity.entity.js'
import { Reseña } from './reseña.entity.js'
import { Cliente } from '../cliente/cliente.entity.js'
//import { Cliente } from '../cliente/cliente.entity.js'

@Entity()
export class Pedido extends BaseClass3 {
  
  @Property()
  estado!: string 

  @Property()
  fecha!: Date

  @Property()
  hora!: Date

  @Property({nullable:true})
  fechaCancelacion?: Date

  @Property({nullable:true})
  horaCancelacion?: Date

  @OneToOne(()=> Reseña, (reseña) => reseña.pedido, {nullable: true, owner: true})
  reseña?: Rel<Reseña>

  @ManyToOne(() => Cliente, {nullable: false})
  cliente!: Rel<Cliente>

  /*@ManyToOne(() => Mesa, {nullable: false})
  mesa!: Rel<Mesa>*/

}