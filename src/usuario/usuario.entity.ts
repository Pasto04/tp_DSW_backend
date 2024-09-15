import { Entity, Property, Collection, Cascade, ManyToOne, Rel, OneToMany } from "@mikro-orm/core";
import { BaseClass2 } from '../shared/db/baseEntity.entity.js'
import { Pedido } from "../pedido/pedido.entity.js";
import { TarjetaCliente } from "../tarjetaCliente/tarjetaCliente.entity.js";
@Entity()
export class Usuario extends BaseClass2{

  @Property({nullable : false})
  nombre!: string

  @Property({nullable : false})
  apellido!: string

  @Property({nullable : false, unique: true})
  mail!: string

  @Property({nullable: false})
  contrasenia!: string

  @Property({nullable : true})
  telefono?: string

  @Property({nullable: false})
  tipoUsuario!: string

  @OneToMany(() => Pedido, (pedido) => pedido.cliente, {nullable: true})
  pedidos = new Collection<Pedido>(this)

  @OneToMany(() => TarjetaCliente, (tarjetaCliente) => tarjetaCliente.cliente, {nullable: true})
  tarjetasCliente = new Collection<TarjetaCliente>(this)

}