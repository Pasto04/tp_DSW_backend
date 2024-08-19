import { Pedido } from "./pedido.entity.js";
import { orm } from "../shared/db/orm.js";
const em = orm.em;
async function sanitizePedidoInput(req, res, next) {
    req.body.sanitizedInput = {
        nroPed: req.body.nroPed,
        estado: req.body.estado,
        hora: req.body.hora,
        fecha: req.body.fecha,
        nroMesa: req.body.nroMesa,
    };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        const pedidos = await em.find(Pedido, {});
        res.status(200).json({ message: 'Todos los pedido encontrados', data: pedidos });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const nroPed = Number.parseInt(req.params.nroPed);
        const pedido = await em.findOneOrFail(Pedido, { nroPed });
        res.status(200).json({ message: 'Pedido encontrado', data: pedido });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const pedido = em.create(Pedido, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Cliente creado', data: pedido });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const nroPed = Number.parseInt(req.params.nroPed);
        const pedidoToUpdate = await em.findOneOrFail(Pedido, { nroPed });
        em.assign(pedidoToUpdate, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({ message: 'Pedido actualizado', data: pedidoToUpdate });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const nroPed = Number.parseInt(req.params.nroPed);
        const pedido = await em.findOneOrFail(Pedido, { nroPed });
        em.removeAndFlush(pedido);
        res.status(200).json({ message: 'El pedido ha sido eliminado con éxito', data: pedido });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizePedidoInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=pedido.controler.js.map