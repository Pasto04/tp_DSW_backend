import { Entity, ManyToOne, Property, Cascade, OneToMany, Collection, Rel } from '@mikro-orm/core';
import { Tarjeta } from './tarjeta.entity.js';
import { BaseClass6 } from '../shared/db/baseEntity.entity.js';
import { Pago } from '../pedido/pago/pago.entity.js';
import { Usuario } from '../usuario/usuario.entity.js';
import { vencimiento } from '../shared/db/vencimiento.type.js';

@Entity()
export class TarjetaCliente extends BaseClass6 {

  @Property({ nullable: false, unique: true })
  nroTarjeta!: number;

  @Property({ nullable: false })
  tipoTarjeta!: string;

  @Property({ nullable: false })
  bancoTarjeta!: string;

  @Property({ nullable: false })
  titular!: string;

  @Property({ nullable: false })
  vencimiento!: vencimiento;

  @Property({ nullable: false })
  codSeguridad!: number;

  @ManyToOne(() => Tarjeta, { cascade: [Cascade.PERSIST, Cascade.MERGE] })
  tarjeta!: Rel<Tarjeta>;

  @OneToMany(() => Pago, (pago) => pago.tarjetaCliente)
  pagos = new Collection<Pago>(this)

  @ManyToOne(() => Usuario, { nullable: false })
  cliente!: Rel<Usuario>
}