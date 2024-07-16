import { TipoPlato } from "./tipoPlato.entity.js";
const tipoPlatos = [
    new TipoPlato('Fideos al pesto', 'Principal', 'sdnunae-sdead-aed23-d23de3-4hsha')
];
export class TipoPlatoRepository {
    findAll() {
        return tipoPlatos;
    }
    findOne(item) {
        return tipoPlatos.find((tipoPlato) => tipoPlato.id === item.id);
    }
    add(item) {
        tipoPlatos.push(item);
        return item;
    }
    update(item) {
        const tipoPlatoIdx = tipoPlatos.findIndex((tipoPlato) => tipoPlato.id === item.id);
        if (tipoPlatoIdx !== -1) {
            tipoPlatos[tipoPlatoIdx] = { ...tipoPlatos[tipoPlatoIdx], ...item };
        }
        return tipoPlatos[tipoPlatoIdx];
    }
    delete(item) {
        const tipoPlatoIdx = tipoPlatos.findIndex((tipoPlato) => tipoPlato.id === item.id);
        if (tipoPlatoIdx !== -1) {
            const deleteTipoPlato = tipoPlatos[tipoPlatoIdx];
            tipoPlatos.splice(tipoPlatoIdx, 1);
            return deleteTipoPlato;
        }
    }
}
//# sourceMappingURL=tipoPlato.repository.js.map