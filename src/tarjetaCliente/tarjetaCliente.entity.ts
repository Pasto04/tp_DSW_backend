import { Entity, ManyToOne, Property, Cascade, OneToMany, Collection, Unique, Rel } from '@mikro-orm/core';
import { Tarjeta } from './tarjeta.entity.js';
import { BaseClass6 } from '../shared/db/baseEntity.entity.js';
import { Pago } from '../pago/pago.entity.js';
import { Cliente } from '../cliente/cliente.entity.js';
import { vencimiento } from '../shared/db/vencimiento.type.js';

@Entity()
export class TarjetaCliente extends BaseClass6 {

  @Property({ nullable: false })
  nroTarjeta!: string;

  @Property({ nullable: false })
  tipoTarjeta!: string;

  @Property({ nullable: false })
  bancoTarjeta!: string;

  @Property({ nullable: false })
  titular!: string;

  @Property({ nullable: false })
  vencimiento!: vencimiento;

  @Property({ nullable: false })
  codSeguridad!: string;

  @ManyToOne(() => Tarjeta, { cascade: [Cascade.PERSIST, Cascade.MERGE] })
  tarjeta!: Rel<Tarjeta>;

  @OneToMany(() => Pago, (pago) => pago.tarjetaCliente)
  pagos = new Collection<Pago>(this)

  @ManyToOne(() => Cliente, { nullable: false })
  cliente?: Rel<Cliente>
}