import { TipoIngredienteRepository } from './tipo-ingrediente.repository.js';
import { TipoIngrediente } from './tipo-ingrediente.entity.js';
const repository = new TipoIngredienteRepository;
function sanitizeTipoIngrediente(req, res, next) {
    req.body.sanitizedTIngrediente = {
        codigo: req.body.codigo,
        descripcion: req.body.descripcion
    };
    Object.keys(req.body.sanitizedTIngrediente).forEach((keys) => {
        if (req.body.sanitizedTIngrediente[keys] === undefined) {
            delete req.body.sanitizedTIngrediente[keys];
        }
    });
    next();
}
function findAll(req, res) {
    res.json({ data: repository.findAll() });
}
function findOne(req, res) {
    const codigo = req.params.cod;
    const tIngrediente = repository.findOne({ codigo });
    if (!tIngrediente) {
        return res.status(404).send({ message: 'Este tipo de ingrediente no se ha encontrado' });
    }
    res.json({ data: tIngrediente });
}
function add(req, res) {
    const input = req.body.sanitizedTIngrediente;
    const tIngredienteInput = new TipoIngrediente(input.codigo, input.descripcion);
    const tIngrediente = repository.add(tIngredienteInput);
    return res.status(201).send({ message: 'Nuevo tipo de ingrediente creado con éxito', data: tIngrediente });
}
function update(req, res) {
    req.body.sanitizedTIngrediente.codigo = req.params.cod;
    const updatedTIngrediente = repository.update(req.body.sanitizedTIngrediente);
    if (!updatedTIngrediente) {
        return res.status(404).send({ message: 'El tipo de ingrediente no ha sido encontrado' });
    }
    return res.status(200).send({ message: 'Ingrediente modificado con éxito' });
}
//Incorporar método "delete"
export { sanitizeTipoIngrediente, findAll, findOne, add, update };
//# sourceMappingURL=tipo-ingrediente.controler.js.map