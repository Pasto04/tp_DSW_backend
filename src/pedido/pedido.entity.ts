import { Entity, Property, ManyToOne, OneToMany, Cascade, Rel, Collection } from '@mikro-orm/core'
import { BaseClass3 } from '../shared/db/baseEntity.entity.js'
//import { Cliente } from '../cliente/cliente.entity.js'

@Entity()
export class Ingrediente extends BaseClass3 {
  @Property()
  nroMesa!: number

  @Property()
  estado!: string 

  @Property()
  fecha!: Date

  @Property()
  hora!: Date

 /* @ManyToOne(() => Cliente)
  cliente!: Cliente;*/
}