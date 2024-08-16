import crypto from 'node:crypto';
export class Pedido {
    constructor(estado, fecha, hora, nroMesa, nroPed = crypto.randomUUID(), cliente) {
        this.estado = estado;
        this.fecha = fecha;
        this.hora = hora;
        this.nroMesa = nroMesa;
        this.nroPed = nroPed;
        this.cliente = cliente;
    }
}
//# sourceMappingURL=pedido.entity.js.map