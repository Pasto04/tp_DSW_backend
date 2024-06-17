import { ClienteRepository } from "./cliente.repository.js";
import { Cliente } from "./cliente.entity.js";
const repository = new ClienteRepository;
function sanitizeClienteInput(req, res, next) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        mail: req.body.mail,
        telefono: req.body.telefono,
    };
    Object.keys(req.body.sanitizedInput).forEach(key => {
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
    const cliente = repository.findOne({ id });
    if (!cliente) {
        return res.status(404).send({ message: 'Character not found' });
    }
    res.json({ data: cliente });
}
function add(req, res) {
    const input = req.body.sanitizedInput;
    const clienteInput = new Cliente(input.nombre, input.apellido, input.mail, input.telefono);
    const cliente = repository.add(clienteInput);
    return res.status(201).send({ message: 'Cliente creado', data: cliente });
}
function update(req, res) {
    req.body.sanitizedInput.id = req.params.id;
    const cliente = repository.update(req.body.sanitizedInput);
    if (cliente) {
        return res.status(404).send({ message: 'Character not found' });
    }
    return res.status(200).send({ message: 'Cliente actualizado', data: cliente });
}
function remove(req, res) {
    const id = req.params.id;
    const cliente = repository.delete({ id });
    if (!cliente) {
        res.status(404).send({ message: 'Cliente no encontrado' });
    }
    else {
        res.status(200).send({ message: 'El cliente fue borrado con exito' });
    }
}
export { sanitizeClienteInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=cliente.controler.js.map