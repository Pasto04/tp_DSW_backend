import { TipoPlato } from "./tipoplato.entity.js";
import { TipoPlatoRepository } from "./tipoplato.repository.js";
const repository = new TipoPlatoRepository();
function sanitizeTipoPlatoInput(req, res, next) {
    req.body.satinizedInput = {
        name: req.body.name,
        tipoplatoClass: req.body.platoClass,
        level: req.body.level,
        hp: req.body.hp,
        mana: req.body.mana,
        items: req.body.items,
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
    const id = req.params.id;
    const TipoPlato = repository.findOne({ id });
    if (!TipoPlato) {
        res.status(404).send({ message: 'TipoPlato nor found' });
    }
    res.json({ data: TipoPlato });
}
function add(req, res) {
    const input = req.body.satinizedInput;
    const tipoplatoInput = new TipoPlato(input.name, input.tipoplatoClass, input.level, input.hp, input.mana, input.items);
    const tipoplatos = repository.add(tipoplatoInput);
    return res.status(201).send({ message: 'TipoPlato created', data: tipoplatos });
}
function update(req, res) {
    req.body.sanitizedInput = req.params.id;
    const tipoplato = repository.update(req.body.sanitizedInput);
    if (!tipoplato) {
        return res.status(404).send({ message: 'TipoPlato not found' });
    }
    return res.status(200).send({ message: 'TipoPlato update successfully', data: tipoplato });
}
function remove(req, res) {
    const id = req.params.id;
    const tipoplato = repository.delete({ id });
    if (!tipoplato) {
        return res.status(404).send({ message: 'TipoPlato not found' });
    }
    else {
        res.status(200).send({ message: 'TipoPlato deleted successfully' });
    }
}
export { sanitizeTipoPlatoInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=tipoplato.controler.js.map