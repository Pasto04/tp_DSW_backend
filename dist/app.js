import express from 'express';
import { tipoIngredienteRouter } from './tipoIngrediente/tipoIngrediente.routes.js';
import { ingredienteRouter } from './ingrediente/ingrediente.routes.js';
import { clienteRouter } from './cliente/cliente.routes.js';
import { tipoplatoRouter } from './tipoplato/tipoplato.routes.js';
import { platoRouter } from './plato/plato.routes.js';
import { elaboracionPlatoRouter } from './elaboracionPlato/elaboracionPlato.routes.js';
const port = 3000;
const app = express();
app.use(express.json());
app.use('/api/tiposIngrediente', tipoIngredienteRouter);
app.use('/api/ingredientes', ingredienteRouter);
app.use('/api/cliente', clienteRouter);
app.use('/api/tipoplato', tipoplatoRouter);
app.use('/api/plato', platoRouter);
app.use('/api/elaboracionesPlato', elaboracionPlatoRouter);
app.use((req, res) => {
    return res.status(404).send({ message: 'Recurso no encontrado' });
});
app.listen(port, () => {
    console.log(`Server running in: http://localhost:${port}/`);
});
//# sourceMappingURL=app.js.map