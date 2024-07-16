import { TipoPlato } from "./tipoPlato.entity.js";
import { TipoPlatoRepository } from "./tipoPlato.repository.js";
const repository = new TipoPlatoRepository();
function sanitizedTipoPlatoInput(req, res, next) {
    req.body.satinizedInput = {
        name: req.body.name,
        tipoPlatoClass: req.body.tipoPlatoClass,
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
    const tipoPlatoInput = new TipoPlato(input.name, input.tipoPlatoClass);
    const tipoPlatos = repository.add(tipoPlatoInput);
    return res.status(201).send({ message: 'tipoPlato created', data: tipoPlatos });
}
function update(req, res) {
    req.body.sanitizedInput = req.params.id;
    const tipoPlato = repository.update(req.body.sanitizedInput);
    if (!tipoPlato) {
        return res.status(404).send({ message: 'tipoPlato not found' });
    }
    return res.status(200).send({ message: 'tipoPlato update successfully', data: tipoPlato });
}
function remove(req, res) {
    const id = req.params.id;
    const tipoPlato = repository.delete({ id });
    if (!tipoPlato) {
        return res.status(404).send({ message: 'tipoPlato not found' });
    }
    else {
        res.status(200).send({ message: 'tipoPlato deleted successfully' });
    }
}
export { sanitizedTipoPlatoInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=plato.controler.js.map