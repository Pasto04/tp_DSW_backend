import { IngredienteRepository } from "./ingrediente.repository.js";
import { Ingrediente } from "./ingrediente.entity.js";
const ingreRepository = new IngredienteRepository;
function sanitizeIngrediente(req, res, next) {
    req.body.sanitizedIngrediente = {
        codIngrediente: req.body.codIngrediente,
        descIngrediente: req.body.descIngrediente,
        stockIngrediente: req.body.stockIngrediente,
        puntoPedido: req.body.puntoPedido,
        tipoIngrediente: req.body.tipoIngrediente
    };
    Object.keys(req.body.sanitizedIngrediente).forEach((keys) => {
        if (req.body.sanitizedIngrediente[keys] === undefined) {
            delete req.body.sanitizedIngrediente[keys];
        }
    });
    next();
}
function findAll(req, res) {
    res.json({ data: ingreRepository.findAll() });
}
function findOne(req, res) {
    const codIngre = req.params.codIngrediente;
    const ingre = ingreRepository.findOne({ codigo: codIngre });
    if (!ingre) {
        res.status(404).send({ message: 'No se ha encontrado el ingrediente ingresado' });
    }
    res.json({ data: ingre });
}
function add(req, res) {
    const input = req.body.sanitizedIngrediente;
    const ingreInput = new Ingrediente(input.codIngrediente, input.descIngrediente, input.stockIngrediente, input.puntoPedido, input.tipoIngrediente);
    const ingre = ingreRepository.add(ingreInput);
    res.status(201).send({ message: 'El ingrediente ha sido creado correctamente', data: ingre });
}
function update(req, res) {
    req.body.sanitizedIngrediente.codIngrediente = req.params.codIngrediente;
    const updatedIngrediente = ingreRepository.update(req.body.sanitizedIngrediente);
    if (!updatedIngrediente) {
        res.status(404).send({ message: 'No se ha encontrado el ingrediente ingresado' });
    }
    res.status(200).send({ message: 'El ingrediente ha sido modificado con éxito' });
}
function remove(req, res) {
    const codIngre = req.params.codIngrediente;
    const deletedIngre = ingreRepository.delete({ codigo: codIngre });
    if (!deletedIngre) {
        res.status(404).send({ message: 'No se ha encontrado el ingrediente ingresado' });
    }
    res.status(200).send({ message: 'El ingrediente ha sido eliminado con éxito' });
}
export { sanitizeIngrediente, findAll, findOne, add, update, remove };
//# sourceMappingURL=ingrediente.controler.js.map