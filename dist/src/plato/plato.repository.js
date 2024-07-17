import { Plato } from "./plato.entity.js";
const platos = [
    new Plato('Sevastian Villa', 'Luchador', 15, 1000, 6000, 1000, 
    //['Boca', 'Vilaaaaaaa'],
    'fffros453od-sdasdd44-da453dad-3hdfdg33-dd6565d-dddd88')
];
export class PlatoRepository {
    findAll() {
        return platos;
    }
    findOne(item) {
        return platos.find((plato) => plato.id === item.id);
    }
    add(item) {
        platos.push(item);
        return item;
    }
    update(item) {
        const platoIdx = platos.findIndex((plato) => plato.id === item.id);
        if (platoIdx !== -1) {
            platos[platoIdx] = { ...platos[platoIdx], ...item };
        }
        return platos[platoIdx];
    }
    delete(item) {
        const platoIdx = platos.findIndex((plato) => plato.id === item.id);
        if (platoIdx !== -1) {
            const deletePlato = platos[platoIdx];
            platos.splice(platoIdx, 1);
            return deletePlato;
        }
    }
}
//# sourceMappingURL=plato.repository.js.map