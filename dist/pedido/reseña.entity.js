var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, OneToOne, PrimaryKeyType } from "@mikro-orm/core";
import { Pedido } from "./pedido.entity.js";
export let Resena = class Resena {
};
__decorate([
    OneToOne(() => Pedido, { primary: true, owner: true }),
    __metadata("design:type", Object)
], Resena.prototype, "pedido", void 0);
__decorate([
    Property({ primary: true }),
    __metadata("design:type", Date)
], Resena.prototype, "fechaResena", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Resena.prototype, "cuerpo", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Resena.prototype, "puntaje", void 0);
Resena = __decorate([
    Entity()
], Resena);
//# sourceMappingURL=rese%C3%B1a.entity.js.map