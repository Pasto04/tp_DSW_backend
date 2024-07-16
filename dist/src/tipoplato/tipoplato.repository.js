import { TipoPlato } from "./tipoplato.entity.js";
const tipoplatos = [
    new TipoPlato('Sevastian Villa', 'Luchador', 15, 1000, 6000, 1000, 
    //['Boca', 'Vilaaaaaaa'],
    'fffros453od-sdasdd44-da453dad-3hdfdg33-dd6565d-dddd88')
];
export class TipoPlatoRepository {
    findAll() {
        return tipoplatos;
    }
    findOne(item) {
        return tipoplatos.find((tipoplato) => tipoplato.id === item.id);
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
        const tipoplatoIdx = tipoplatos.findIndex((tipoplato) => tipoplato.id === item.id);
        if (tipoplatoIdx !== -1) {
            const deleteTipoPlato = tipoplatos[tipoplatoIdx];
            tipoplatos.splice(tipoplatoIdx, 1);
            return deleteTipoPlato;
        }
    }
}
//# sourceMappingURL=tipoplato.repository.js.map