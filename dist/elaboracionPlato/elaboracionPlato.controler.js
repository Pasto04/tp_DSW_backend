import { ElaboracionPlatoRepository } from "./elaboracionPlato.repository.js";
import { ElaboracionPlato } from "./elaboracionPlato.entity.js";
const elabPlatoRepository = new ElaboracionPlatoRepository;
function sanitizeElaboracionPlato(req, res, next) {
    req.body.sanitizedElaboracionPlato = {
        ingrediente: req.body.ingrediente,
        plato: req.body.plato,
        cantIngreNecesaria: req.body.cantIngreNecesaria
    };
    Object.keys(req.body.sanitizedElaboracionPlato).forEach((keys) => {
        if (req.body.sanitizedElaboracionPlato[keys] === undefined) {
            delete req.body.sanitizedElaboracionPlato[keys];
        }
    });
    next();
}
function findAll(req, res) {
    res.json({ data: elabPlatoRepository.findAll() });
}
function findOne(req, res) {
    const codIngre = req.params.codIngrediente;
    const nroPlato = req.params.nro;
    const elabPlato = elabPlatoRepository.findOne({ codIngrediente: codIngre, nro: nroPlato });
    if (!elabPlato) {
        res.status(404).send({ message: 'No se ha encontrado la cantidad necesaria del ingrediente para el plato seleccionado' });
    }
    res.json({ data: elabPlato });
}
function add(req, res) {
    const input = req.body.sanitizedElaboracionPlato;
    const elabPlatoInput = new ElaboracionPlato(input.ingrediente, input.plato, input.cantIngreNecesaria);
    const elabPlato = elabPlatoRepository.add(elabPlatoInput);
    res.status(201).send({ message: 'Se ha establecido la cantidad necesaria del ingrediente para el plato seleccionado', data: elabPlato });
}
function update(req, res) {
    //Como ingrediente y plato pueden ser "undefined", en esos casos no se les puede asignar el código enviado como parámetro en la request. Necesito solucionar este problema.
    const codIngre = req.params.codIngrediente;
    const nroPlato = req.params.nro;
    const updatedElabPlato = elabPlatoRepository.update(req.body.sanitizedElaboracionPlato, { codIngrediente: codIngre, nro: nroPlato });
    if (!updatedElabPlato) {
        res.status(404).send({ message: 'No se ha encontrado la cantidad necesaria del ingrediente para el plato seleccionado' });
    }
    res.status(200).json({ message: 'Se ha actualizado la cantidad necesaria del ingrediente para el plato seleccionado con éxito', data: updatedElabPlato });
}
function remove(req, res) {
    const codIngre = req.params.codIngrediente;
    const nroPlato = req.params.nro;
    const deletedElabPlato = elabPlatoRepository.delete({ codIngrediente: codIngre, nro: nroPlato });
    if (!deletedElabPlato) {
        res.status(404).send({ message: 'No se ha encontrado la cantidad necesaria del ingrediente para el plato seleccionado' });
    }
    res.status(200).json({ message: 'Se ha eliminado la cantidad necesaria del ingrediente para el plato seleccionado con éxito', data: deletedElabPlato });
}
export { sanitizeElaboracionPlato, findAll, findOne, add, update, remove };
//# sourceMappingURL=elaboracionPlato.controler.js.map