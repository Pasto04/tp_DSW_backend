import { Pedido } from "./pedido.entity.js";
import { Cliente } from "../cliente/cliente.entity.js";
const pedidos = [
    new Pedido('Ocupada', new Date(2023, 6, 20), (() => {
        const hora = new Date();
        hora.setHours(14, 30, 0, 0); // Establecer hora a las 14:30:00
        return hora;
    })(), 7, 'd0c48218-7b5b-4796-8569-a6b24e638e9f', new Cliente('juan', 'pastorino', 'juan@gmail', 123124145, 'd0c48218-7b5b-4796-8569-a6b24e638e9f'))
];
export class PedidoRepository {
    findAll() {
        return pedidos;
    }
    findOne(item) {
        return pedidos.find((pedido) => pedido.nroPed === item.nroPed);
    }
    add(item) {
        pedidos.push(item);
        return item;
    }
    update(item) {
        const pedidoIdx = pedidos.findIndex(pedido => pedido.nroPed === item.nroPed);
        if (pedidoIdx !== -1) {
            pedidos[pedidoIdx] = { ...pedidos[pedidoIdx], ...item };
        }
        return pedidos[pedidoIdx];
    }
    delete(item) {
        const pedidoIdx = pedidos.findIndex(pedido => pedido.nroPed === item.nroPed);
        if (pedidoIdx !== -1) {
            const pedidosborrados = pedidos[pedidoIdx];
            pedidos.splice(pedidoIdx, 1);
            return pedidosborrados;
        }
    }
}
//# sourceMappingURL=pedido.repository.js.map