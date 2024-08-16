import { PedidoRepository } from "./pedido.repository.js";
import { Pedido } from "./pedido.entity.js";
const repository = new PedidoRepository;
function sanitizePedidoInput(req, res, next) {
    req.body.sanitizedInput = {
        estado: req.body.estado,
        fecha: req.body.fecha,
        hora: req.body.hora,
        nroMesa: req.body.nroMesa,
        nroPed: req.body.nroPed,
        cliente: req.body.cliente,
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
    const nroPed = req.params.nroPed;
    const pedido = repository.findOne({ codigo: nroPed });
    if (!pedido) {
        return res.status(404).send({ message: 'Pedido no encontrado' });
    }
    res.json({ data: pedido });
}
function add(req, res) {
    const input = req.body.sanitizedInput;
    const pedidoInput = new Pedido(input.estado, input.fecha, input.hora, input.nroMesa, input.nroPed, input.cliente);
    const pedido = repository.add(pedidoInput);
    return res.status(201).send({ message: 'Pedido creado', data: pedido });
}
function update(req, res) {
    req.body.sanitizedInput.nroPed = req.params.nroPed;
    const pedido = repository.update(req.body.sanitizedInput);
    if (!pedido) {
        return res.status(404).send({ message: 'Pedido no encontrado' });
    }
    return res.status(200).send({ message: 'Pedido actualizado', data: pedido });
}
function remove(req, res) {
    const nroPed = req.params.nroPed;
    const pedido = repository.delete({ codigo: nroPed });
    if (!pedido) {
        res.status(404).send({ message: 'Pedido no encontrado' });
    }
    else {
        res.status(200).send({ message: 'El pedido fue borrado con exito' });
    }
}
export { sanitizePedidoInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=pedido.controler.js.map