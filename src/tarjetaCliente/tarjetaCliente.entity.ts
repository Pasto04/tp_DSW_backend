import { Entity, ManyToOne, Property, Cascade } from '@mikro-orm/core';
import { Tarjeta } from './tarjeta.entity.js';
import { BaseClass6 } from '../shared/db/baseEntity.entity.js';

@Entity()
export class TarjetaCliente extends BaseClass6 {
  @Property()
  codTarjeta!: string;

  @Property()
  tipoTarjeta!: string;

  @Property()
  bancoTarjeta!: string;

  @Property()
  titular!: string;

  @Property()
  vencimiento!: Date;

  @Property()
  codSeguridad!: string;

  @ManyToOne(() => Tarjeta, { cascade: [Cascade.PERSIST, Cascade.MERGE] })
  tarjeta!: Tarjeta;


}