import { Entity, Property, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseClass6 } from "../shared/db/baseEntity.entity.js";
import { TarjetaCliente } from "./tarjetaCliente.entity.js";

@Entity()
export class Tarjeta extends BaseClass6{

  @Property({nullable: false, unique: true})
  descTarjeta!: string

    @OneToMany(() => TarjetaCliente, tarjetaCliente => tarjetaCliente.tarjeta)
  tarjetaClientes = new Collection<TarjetaCliente>(this);

}