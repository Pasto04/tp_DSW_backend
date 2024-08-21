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
export let Reseña = class Reseña {
};
__decorate([
    OneToOne(() => Pedido, { primary: true }),
    __metadata("design:type", Object)
], Reseña.prototype, "pedido", void 0);
__decorate([
    Property({ primary: true }),
    __metadata("design:type", Date)
], Reseña.prototype, "fechaRese\u00F1a", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Reseña.prototype, "cuerpo", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], Reseña.prototype, "puntaje", void 0);
Reseña = __decorate([
    Entity()
], Reseña);
//# sourceMappingURL=rese%C3%B1a.entity.js.map