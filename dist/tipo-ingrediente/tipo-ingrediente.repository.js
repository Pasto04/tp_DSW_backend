import { TipoIngrediente } from './tipo-ingrediente.entity.js';
const tiposIngrediente = [
    new TipoIngrediente('b780c4c6-68c2-4177-8371-af0102a99d38', 'Verdura')
];
export class TipoIngredienteRepository {
    findAll() {
        return tiposIngrediente;
    }
    findOne(item) {
        return tiposIngrediente.find((tIngrediente) => tIngrediente.codigo === item.codigo);
    }
    add(item) {
        tiposIngrediente.push(item);
        return item;
    }
    update(item) {
        const tIngredienteIndex = tiposIngrediente.findIndex((tIngrediente) => tIngrediente.codigo === item.codigo);
        if (tIngredienteIndex !== -1) {
            tiposIngrediente[tIngredienteIndex] = { ...tiposIngrediente[tIngredienteIndex], ...item };
        }
        return tiposIngrediente[tIngredienteIndex];
    }
}
//# sourceMappingURL=tipo-ingrediente.repository.js.map