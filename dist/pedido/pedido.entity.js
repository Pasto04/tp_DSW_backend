var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne, OneToMany, Collection, OneToOne, BeforeCreate, DateType, TimeType } from '@mikro-orm/core';
import { BaseClass3 } from '../shared/db/baseEntity.entity.js';
import { Resena } from './reseña.entity.js';
import { Usuario } from '../usuario/usuario.entity.js';
import { PlatoPedido } from '../plato/platoPedido/platoPedido.entity.js';
import { Mesa } from '../mesa/mesa.entity.js';
import { Pago } from './pago/pago.entity.js';
import { BebidaPedido } from '../bebida/bebidaPedido/bebidaPedido.entity.js';
export let Pedido = class Pedido extends BaseClass3 {
    constructor() {
        super(...arguments);
        this.estado = 'en curso';
        this.platosPedido = new Collection(this);
        this.bebidasPedido = new Collection(this);
    }
    establecerFechaYHoraCancelacion() {
        this.fechaCancelacion = new Date();
        this.horaCancelacion = (new Date()).toTimeString().split(' ')[0];
    }
    establecerFechaYHora() {
        this.fecha = new Date();
        this.hora = (new Date()).toTimeString().split(' ')[0];
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Pedido.prototype, "estado", void 0);
__decorate([
    Property({ nullable: false, type: DateType }),
    __metadata("design:type", Date)
], Pedido.prototype, "fecha", void 0);
__decorate([
    Property({ nullable: false, type: TimeType }),
    __metadata("design:type", String)
], Pedido.prototype, "hora", void 0);
__decorate([
    Property({ nullable: true, type: DateType }),
    __metadata("design:type", Date)
], Pedido.prototype, "fechaCancelacion", void 0);
__decorate([
    Property({ nullable: true, type: TimeType }),
    __metadata("design:type", String)
], Pedido.prototype, "horaCancelacion", void 0);
__decorate([
    ManyToOne(() => Usuario, { nullable: false }),
    __metadata("design:type", Object)
], Pedido.prototype, "cliente", void 0);
__decorate([
    ManyToOne(() => Mesa, { nullable: false }),
    __metadata("design:type", Object)
], Pedido.prototype, "mesa", void 0);
__decorate([
    OneToMany(() => PlatoPedido, (platoPedido) => platoPedido.pedido),
    __metadata("design:type", Object)
], Pedido.prototype, "platosPedido", void 0);
__decorate([
    OneToMany(() => BebidaPedido, (bebidaPedido) => bebidaPedido.pedido),
    __metadata("design:type", Object)
], Pedido.prototype, "bebidasPedido", void 0);
__decorate([
    OneToOne(() => Pago, { inversedBy: (pago) => pago.pedido, nullable: true }),
    __metadata("design:type", Object)
], Pedido.prototype, "pago", void 0);
__decorate([
    OneToOne(() => Resena, { inversedBy: (resena) => resena.pedido, nullable: true }),
    __metadata("design:type", Object)
], Pedido.prototype, "resena", void 0);
__decorate([
    BeforeCreate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Pedido.prototype, "establecerFechaYHora", null);
Pedido = __decorate([
    Entity()
], Pedido);
//# sourceMappingURL=pedido.entity.js.map