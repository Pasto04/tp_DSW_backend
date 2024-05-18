import crypto from 'node:crypto';
export class TipoIngrediente {
  constructor(codigo = crypto.randomUUID(), descripcion) {
    this.codigo = codigo;
    this.descripcion = descripcion;
  }
}
//# sourceMappingURL=tipo-ingrediente.entity.js.map
