import { TipoPlato } from "./tipoplato.entity.js";
const tipoplatos = [
    new TipoPlato("Plato Principal", 'b780c4c6-68c2-4177-8371-af0102a66d39')
];
export class TipoPlatoRepository {
    findAll() {
        return tipoplatos;
    }
    findOne(item) {
        return tipoplatos.find((tipoplato) => tipoplato.id === item.codigo);
    }
    add(item) {
        tipoplatos.push(item);
        return item;
    }
    update(item) {
        const tipoplatoIdx = tipoplatos.findIndex((tipoplato) => tipoplato.id === item.id);
        if (tipoplatoIdx !== -1) {
            tipoplatos[tipoplatoIdx] = { ...tipoplatos[tipoplatoIdx], ...item };
        }
        return tipoplatos[tipoplatoIdx];
    }
    delete(item) {
        const tipoplatoIdx = tipoplatos.findIndex((tipoplato) => tipoplato.id === item.codigo);
        if (tipoplatoIdx !== -1) {
            const deleteTipoPlato = tipoplatos[tipoplatoIdx];
            tipoplatos.splice(tipoplatoIdx, 1);
            return deleteTipoPlato;
        }
    }
}
//# sourceMappingURL=tipoplato.repository.js.map