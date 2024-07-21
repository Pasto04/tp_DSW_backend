import crypto from 'node:crypto';
import { Cliente } from '../cliente/cliente.entity.js';
export class Pedido {
    constructor(estado, fecha, hora, nroMesa, nroPed = crypto.randomUUID(), cliente = Cliente) {
        this.estado = estado;
        this.fecha = fecha;
        this.hora = hora;
        this.nroMesa = nroMesa;
        this.nroPed = nroPed;
        this.cliente = cliente;
    }
}
//# sourceMappingURL=pedido.entity.js.map