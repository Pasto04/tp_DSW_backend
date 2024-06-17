import crypto from 'node:crypto';
export class Cliente {
    constructor(nombre, apellido, mail, telefono, id = crypto.randomUUID()) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.telefono = telefono;
        this.id = id;
    }
}
//# sourceMappingURL=cliente.js.map