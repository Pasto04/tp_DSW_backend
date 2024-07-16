import crypto from 'node:crypto';
export class TipoPlato {
    constructor(descripcion, id = crypto.randomUUID()) {
        this.descripcion = descripcion;
        this.id = id;
    }
}
//# sourceMappingURL=tipoplato.entity.js.map