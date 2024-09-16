import { orm } from "../shared/db/orm.js";
import { ElaboracionPlato } from "./elaboracionPlato.entity.js";
import { Plato } from "../plato/plato.entity.js";
import { Ingrediente } from "../ingrediente/ingrediente.entity.js";
import { z } from "zod";
import { validarElaboracionPlato, validarElaboracionPlatoPatch } from "./elaboracionPlato.schema.js";
const em = orm.em;
function handleErrors(error, res) {
    if (error instanceof z.ZodError) {
        res.status(400).json({ message: JSON.parse(error.message)[0].message });
    }
    else if (error.name === 'NotFoundError') {
        res.status(404).json({ message: 'El/los ingredientes del plato no fueron encontrados' });
    }
    else {
        res.status(500).json({ message: error.message });
    }
}
async function findAll(req, res) {
    try {
        const numPlato = Number.parseInt(req.params.nro);
        const plato = await em.findOneOrFail(Plato, { numPlato }, { populate: ['tipoPlato'] });
        const elabPlato = await em.find(ElaboracionPlato, { plato }, { populate: ['ingrediente', 'plato'] });
        res.status(200).json({ message: `La cantidades de los ingredientes del plato ${plato.descripcion} fueron encontradas con éxito`, data: elabPlato });
    }
    catch (error) {
        handleErrors(error, res);
    }
}
async function findOne(req, res) {
    try {
        const numPlato = Number.parseInt(req.params.nro);
        const codigo = Number.parseInt(req.params.cod);
        const plato = await em.findOneOrFail(Plato, { numPlato }, { populate: ['tipoPlato'] });
        const ingrediente = await em.findOneOrFail(Ingrediente, { codigo });
        const elabPlato = await em.findOneOrFail(ElaboracionPlato, { plato, ingrediente }, { populate: ['plato', 'ingrediente'] });
        res.status(200).json({ message: `La cantidad del ingrediente ${ingrediente.descIngre} para el plato ${plato.descripcion} ha sido encontrada con éxito`, data: elabPlato });
    }
    catch (error) {
        handleErrors(error, res);
    }
}
async function add(req, res) {
    try {
        const elabPlatoValido = validarElaboracionPlato(req.body);
        const elabPlato = em.create(ElaboracionPlato, elabPlatoValido);
        await em.flush();
        res.status(201).json({ data: elabPlato });
    }
    catch (error) {
        handleErrors(error, res);
    }
}
async function update(req, res) {
    try {
        const numPlato = Number.parseInt(req.params.nro);
        const codigo = Number.parseInt(req.params.cod);
        const plato = await em.findOneOrFail(Plato, { numPlato });
        const ingrediente = await em.findOneOrFail(Ingrediente, { codigo });
        const elabPlato = await em.findOneOrFail(ElaboracionPlato, { plato, ingrediente });
        let elabPlatoValido;
        if (req.method === 'PATCH') {
            elabPlatoValido = validarElaboracionPlatoPatch(req.body);
        }
        else {
            elabPlatoValido = validarElaboracionPlato(req.body);
        }
        em.assign(elabPlato, elabPlatoValido);
        await em.flush();
        res.status(200).json({ message: `La cantidad del ingrediente ${ingrediente.descIngre} para el plato ${plato.descripcion} ha sido actualizada exitosamente`, data: elabPlato });
    }
    catch (error) {
        handleErrors(error, res);
    }
}
async function remove(req, res) {
    try {
        const numPlato = Number.parseInt(req.params.nro);
        const codigo = Number.parseInt(req.params.cod);
        const plato = await em.findOneOrFail(Plato, { numPlato });
        const ingrediente = await em.findOneOrFail(Ingrediente, { codigo });
        const elabPlato = await em.findOneOrFail(ElaboracionPlato, { plato, ingrediente });
        await em.removeAndFlush(elabPlato);
        res.status(200).json({ message: `La cantidad del ingrediente ${ingrediente.descIngre} para el plato ${plato.descripcion} ha sido eliminada con éxito`, data: elabPlato });
    }
    catch (error) {
        handleErrors(error, res);
    }
}
export { findAll, findOne, add, update, remove };
//# sourceMappingURL=elaboracionPlato.controller.js.map