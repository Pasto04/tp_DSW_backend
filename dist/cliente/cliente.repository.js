import { Cliente } from "./cliente.entity.js";
const clientes = [
    new Cliente('Juan', 'Pastorino', 'juanjose@gmail.com', 3462670753, 'd0c48218-7b5b-4796-8569-a6b24e638e9f')
];
export class ClienteRepository {
    findAll() {
        return clientes;
    }
    findOne(item) {
        return clientes.find((cliente) => cliente.id === item.codigo);
    }
    add(item) {
        clientes.push(item);
        return item;
    }
    update(item) {
        const clienteIdx = clientes.findIndex(cliente => cliente.id === item.id);
        if (clienteIdx !== -1) {
            clientes[clienteIdx] = { ...clientes[clienteIdx], ...item };
        }
        return clientes[clienteIdx];
    }
    delete(item) {
        const clienteIdx = clientes.findIndex(cliente => cliente.id === item.codigo);
        if (clienteIdx !== -1) {
            const clientesborrados = clientes[clienteIdx];
            clientes.splice(clienteIdx, 1);
            return clientesborrados;
        }
    }
}
//# sourceMappingURL=cliente.repository.js.map