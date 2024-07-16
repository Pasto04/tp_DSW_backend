import crypto from 'node:crypto';
export class Plato {
    constructor(nro = crypto.randomUUID(), platoClass, descripcion, tiempo) {
        this.nro = nro;
        this.platoClass = platoClass;
        this.descripcion = descripcion;
        this.tiempo = tiempo;
    }
}
//# sourceMappingURL=plato.entity.js.map