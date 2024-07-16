import crypto from 'node:crypto';
export class TipoPlato {
    constructor(name, tipoPlatoClass, id = crypto.randomUUID()) {
        this.name = name;
        this.tipoPlatoClass = tipoPlatoClass;
        this.id = id;
    }
}
//# sourceMappingURL=tipoPlato.entity.js.map