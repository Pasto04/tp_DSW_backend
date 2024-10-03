import { Entity, ManyToOne, Property, Cascade, OneToMany, Collection, Rel, DateType } from '@mikro-orm/core';
import { Tarjeta } from './tarjeta.entity.js';
import { BaseClass6 } from '../shared/db/baseEntity.entity.js';
import { Pago } from '../pedido/pago/pago.entity.js';
import { Usuario } from '../usuario/usuario.entity.js';

@Entity()
export class TarjetaCliente extends BaseClass6 {

  @Property({ nullable: false, unique: true })
  nroTarjeta!: string;

  @Property({ nullable: false })
  tipoTarjeta!: string;

  @Property({ nullable: false })
  bancoTarjeta!: string;

  @Property({ nullable: false })
  titular!: string;

  @Property({ nullable: false, type: DateType })
  vencimiento!: Date;

  @Property({ nullable: false })
  codSeguridad!: number;

  @ManyToOne(() => Tarjeta, { cascade: [Cascade.PERSIST, Cascade.MERGE] })
  tarjeta!: Rel<Tarjeta>;

  @OneToMany(() => Pago, (pago) => pago.tarjetaCliente)
  pagos = new Collection<Pago>(this)

  @ManyToOne(() => Usuario, { nullable: false })
  cliente!: Rel<Usuario>
}