import { Ingrediente } from "./ingrediente.entity.js";
import { TipoIngrediente } from "../tipo-ingrediente/tipo-ingrediente.entity.js";
const ingredientes = [
    new Ingrediente('b780c456-68s2-4177-5371-af0102199j38', 'Tomate Europeo', 50, 20, new TipoIngrediente('b780c4c6-68c2-4177-8371-af0102a99d38', 'Verdura'))
];
export class IngredienteRepository {
    findAll() {
        return ingredientes;
    }
    findOne(item) {
        return ingredientes.find((ingre) => ingre.codIngrediente === item.codigo);
    }
    add(item) {
        ingredientes.push(item);
        return item;
    }
    update(item) {
        const ingreIndex = ingredientes.findIndex((ingre) => ingre.codIngrediente === item.codIngrediente);
        if (ingreIndex !== -1) {
            ingredientes[ingreIndex] = { ...ingredientes[ingreIndex], ...item };
        }
        return ingredientes[ingreIndex];
    }
    delete(item) {
        const ingreIndex = ingredientes.findIndex((ingre) => ingre.codIngrediente === item.codigo);
        if (ingreIndex !== -1) {
            const deletedIngrediente = ingredientes[ingreIndex];
            ingredientes.splice(ingreIndex, 1);
            return deletedIngrediente;
        }
    }
}
//# sourceMappingURL=ingrediente.repository.js.map