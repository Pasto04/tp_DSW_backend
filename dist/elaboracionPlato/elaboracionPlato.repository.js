import { ElaboracionPlato } from "./elaboracionPlato.entity.js";
import { Ingrediente } from "../ingrediente/ingrediente.entity.js";
import { Plato } from "../plato/plato.entity.js";
import { TipoIngrediente } from "../tipoIngrediente/tipoIngrediente.entity.js";
import { TipoPlato } from "../tipoplato/tipoplato.entity.js";
const elaboracionesPlato = [
    new ElaboracionPlato(new Ingrediente('b780c456-68s2-4177-5371-af0102199j38', 'Tomate Europeo', 50, 20, new TipoIngrediente('b780c4c6-68c2-4177-8371-af0102a99d38', 'Verdura', 'Gramos')), new Plato('b780c4c6-68c2-4177-2004-af0102a99d39', new TipoPlato("Plato pricipal", 'b780c4c6-68c2-4177-8371-af0102a66d39'), "Fideos al Pesto", 25), 500)
];
export class ElaboracionPlatoRepository {
    findAll() {
        return elaboracionesPlato;
    }
    findOne(item) {
        return elaboracionesPlato.find((elabPlato) => elabPlato.ingrediente.codIngrediente === item.codIngrediente && elabPlato.plato.nro === item.nro);
    }
    add(item) {
        elaboracionesPlato.push(item);
        return item;
    }
    //Consultar al profe si enviar estos parámetros es correcto para el funcionamiento de la aplicación...
    update(item, claves) {
        const elabPlatoIdx = elaboracionesPlato.findIndex((elabPlato) => elabPlato.ingrediente.codIngrediente === claves.codIngrediente && elabPlato.plato.nro === claves.nro);
        if (elabPlatoIdx !== -1) {
            elaboracionesPlato[elabPlatoIdx] = { ...elaboracionesPlato[elabPlatoIdx], ...item };
        }
        return elaboracionesPlato[elabPlatoIdx];
    }
    delete(item) {
        const elabPlatoIdx = elaboracionesPlato.findIndex((elabPlato) => elabPlato.ingrediente.codIngrediente === item.codIngrediente && elabPlato.plato.nro === item.nro);
        if (elabPlatoIdx !== -1) {
            const deletedElabPlato = elaboracionesPlato[elabPlatoIdx];
            elaboracionesPlato.splice(elabPlatoIdx, 1);
            return deletedElabPlato;
        }
    }
}
//# sourceMappingURL=elaboracionPlato.repository.js.map