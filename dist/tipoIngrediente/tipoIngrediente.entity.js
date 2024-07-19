import crypto from 'node:crypto';
export class TipoIngrediente {
    constructor(codigo = crypto.randomUUID(), descripcion, medicionCantidad) {
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.medicionCantidad = medicionCantidad;
    }
}
//# sourceMappingURL=tipoIngrediente.entity.js.map