import { orm } from "../shared/db/orm.js";
import { Pedido } from "../pedido/pedido.entity.js";
import { PlatoPedido } from "./platoPedido.entity.js";
import { Plato } from "../plato/plato.entity.js";
const em = orm.em;
function sanitizePlatoPedido(req, res, next) {
    req.body.sanitizedPlatoPedido = {
        pedido: req.params.nroPed,
        plato: req.body.plato,
        cantidad: req.body.cantidad
    };
    Object.keys(req.body.sanitizedPlatoPedido).forEach((keys) => {
        if (req.body.sanitizedPlatoPedido[keys] === undefined) {
            delete req.body.sanitizedPlatoPedido[keys];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        const nroPed = Number.parseInt(req.params.nroPed);
        const pedido = await em.findOneOrFail(Pedido, { nroPed });
        const platoPed = await em.find(PlatoPedido, { pedido }, { populate: ['plato', 'pedido'] });
        res.status(200).json({ message: 'Pedidos encontrados', data: platoPed });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const numPlato = Number.parseInt(req.params.nro);
        const nroPed = Number.parseInt(req.params.nroPed);
        const plato = await em.findOneOrFail(Plato, { numPlato }, { populate: ['tipoPlato'] });
        const pedido = await em.findOneOrFail(Pedido, { nroPed });
        const platoPed = await em.findOneOrFail(PlatoPedido, { plato, pedido }, { populate: ['plato', 'pedido'] });
        res.status(200).json({ message: `El plato del pedido ha sido encontrada con éxito`, data: platoPed });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        req.body.sanitizedPlatoPedido.pedido = await em.findOneOrFail(Pedido, { nroPed: Number.parseInt(req.body.sanitizedPlatoPedido.pedido) });
        const platoPed = em.create(PlatoPedido, req.body.sanitizedPlatoPedido);
        await em.flush();
        res.status(201).json({ data: platoPed });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const numPlato = Number.parseInt(req.params.nro);
        const nroPed = Number.parseInt(req.params.nroPed);
        const plato = await em.findOneOrFail(Plato, { numPlato });
        const pedido = await em.findOneOrFail(Pedido, { nroPed });
        const platoPed = await em.findOneOrFail(PlatoPedido, { plato, pedido });
        em.assign(platoPed, req.body.sanitizedPlatoPedido);
        em.flush();
        res.status(200).json({ message: 'Actualiza la cantidad de pedidos', data: platoPed });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const numPlato = Number.parseInt(req.params.nro);
        const nroPed = Number.parseInt(req.params.nroPed);
        const plato = await em.findOneOrFail(Plato, { numPlato });
        const pedido = await em.findOneOrFail(Pedido, { nroPed });
        const platoPed = await em.findOneOrFail(PlatoPedido, { plato, pedido });
        em.removeAndFlush(platoPed);
        res.status(200).json({ message: 'El pedido ha sido eliminado', data: platoPed });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizePlatoPedido, findAll, findOne, add, update, remove };
//# sourceMappingURL=platoPedido.controler.js.map