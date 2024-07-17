import { Plato } from "./plato.entity.js";
import { PlatoRepository } from "./plato.repository.js";
const repository = new PlatoRepository();
function sanitizePlatoInput(req, res, next) {
    req.body.sanitizedInput = {
        nro: req.body.nro,
        platoClass: req.body.platoClass,
        descripcion: req.body.descripcion,
        tiempo: req.body.tiempo,
    };
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
function findAll(req, res) {
    res.json({ data: repository.findAll() });
}
function findOne(req, res) {
    const id = req.params.nro;
    const Plato = repository.findOne({ codigo: id });
    if (!Plato) {
        res.status(404).send({ message: 'Plato not found' });
    }
    res.json({ data: Plato });
}
function add(req, res) {
    const input = req.body.sanitizedInput;
    const platoInput = new Plato(input.nro, input.platoClass, input.descripcion, input.tiempo);
    const platos = repository.add(platoInput);
    return res.status(201).send({ message: 'Plato created', data: platos });
}
function update(req, res) {
    req.body.sanitizedInput.nro = req.params.nro;
    const plato = repository.update(req.body.sanitizedInput);
    if (!plato) {
        return res.status(404).send({ message: 'Plato not found' });
    }
    return res.status(200).send({ message: 'Plato update successfully', data: plato });
}
function remove(req, res) {
    const id = req.params.nro;
    const plato = repository.delete({ codigo: id });
    if (!plato) {
        return res.status(404).send({ message: 'Plato not found' });
    }
    else {
        res.status(200).send({ message: 'Plato deleted successfully' });
    }
}
export { sanitizePlatoInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=plato.controler.js.map