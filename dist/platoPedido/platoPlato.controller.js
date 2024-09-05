import { orm } from "../shared/db/orm.js";
import { PlatoPedido } from "./platoPedido.entity.js";
import { Plato } from "../plato/plato.entity.js";
import { Pedido } from "../pedido/pedido.entity.js";
const em = orm.em;
async function sanitizePlatoPlato(req, res, next) {
    //console.log(`unsanitized: ${JSON.stringify(req.body)}`)
    req.body.sanitizePlatoPlato = {
        pedido: req.body.pedido,
        plato: req.params.nro,
        cantidad: req.body.cantidad,
        fechaSolicitud: req.body.fechaSolicitud,
        horaSolicitud: req.body.horaSolicitud,
        entregado: req.body.entregado
    };
    Object.keys(req.body.sanitizePlatoPlato).forEach((keys) => {
        if (req.body.sanitizePlatoPlato[keys] === undefined) {
            delete req.body.sanitizePlatoPlato[keys];
        }
    });
    next();
}
//CONSULTAR SI ES CORRECTO EL DESARROLLO DE LOS MÉTODOS DE ESTA MANERA
async function findAll(req, res) {
    try {
        const numPlato = Number.parseInt(req.params.nro);
        const plato = await em.findOneOrFail(Plato, { numPlato }, { populate: ['tipoPlato'] });
        const platoPed = await em.find(PlatoPedido, { plato }, { populate: ['pedido', 'plato'] });
        res.status(200).json({ message: `El pedido fue encontrado con exito`, data: platoPed });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        //req.body.sanitizePlatoPlato.plato = await em.findOne(Plato, {numPlato: req.body.sanitizePlatoPlato.plato})
        const platoPed = em.create(PlatoPedido, req.body.sanitizePlatoPlato);
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
        em.assign(platoPed, req.body.sanitizePlatoPlato);
        em.flush();
        res.status(200).json({ message: `El plato ha sido actualizado exitosamente`, data: platoPed });
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
        res.status(200).json({ message: `El plato del pedido ha sido eliminada con éxito`, data: platoPed });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizePlatoPlato, findAll, add, update, remove };
//# sourceMappingURL=platoPlato.controller.js.map