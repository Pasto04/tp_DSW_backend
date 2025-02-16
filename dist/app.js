import 'reflect-metadata';
import { RequestContext } from '@mikro-orm/core';
import { orm, syncSchema } from './shared/db/orm.js';
import express from 'express';
import { ingredienteRouter } from './ingrediente/ingrediente.routes.js';
import { tipoPlatoRouter } from './plato/tipoPlato.routes.js';
import { platoRouter } from './plato/plato.routes.js';
import { usuarioRouter } from './usuario/usuario.routes.js';
import { pedidoRouter } from './pedido/pedido.routes.js';
import { platoPedidoRouter } from './plato/platoPedido/platoPedido.routes.js';
import { getResenaRouter, pedidoResenaRouter, resenaRouter } from './pedido/reseña.routes.js';
import { elabPlatoRouter } from './plato/elaboracionPlato/elaboracionPlato.routes.js';
import { pedidoClienteRouter } from './pedido/pedidoCliente.routes.js';
import { proveedorRouter } from './proveedor/proveedor.routes.js';
import { ingredienteDeProveedorRouter } from './ingrediente/ingredienteDeProveedor/ingredienteDeProveedor.routes.js';
import { tarjetaRouter } from './tarjetaCliente/tarjeta.routes.js';
import { tarjetaClienteRouter } from './tarjetaCliente/tarjetaCliente.routes.js';
import { mesaRouter } from './mesa/mesa.routes.js';
import { bebidaRouter } from './bebida/bebida.routes.js';
import { bebidaPedidoRouter } from './bebida/bebidaPedido/bebidaPedido.routes.js';
import { PedidoPagoRouter } from './pedido/pago/pago.routes.js';
import { bebidaDeProveedorRouter } from './bebida/bebidaDeProveedor/bebidaDeProveedor.routes.js';
import cookieParser from 'cookie-parser'; // Nos permite guardar el token para mantener la sesión del usuario en una cookie
import { ACCEPTED_ORIGINS } from './shared/config.js';
import cors from 'cors';
const port = process.env.PORT ?? 3000;
const app = express();
app.use(express.json());
app.use(cors({
    origin: (origin, callback) => {
        if (origin && ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }
        else if (!origin) {
            return callback(null, true);
        }
        else {
            return callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use(cookieParser());
//
app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
});
//
app.use('/api/usuarios', usuarioRouter);
app.use('/api/ingredientes', ingredienteDeProveedorRouter);
app.use('/api/ingredientes', ingredienteRouter);
app.use('/api/platos/tipos', tipoPlatoRouter);
app.use('/api/platos', elabPlatoRouter);
app.use('/api/platos', platoRouter);
app.use('/api/clientes', tarjetaClienteRouter);
app.use('/api/clientes', pedidoClienteRouter);
app.use('/api/pedidos', PedidoPagoRouter);
app.use('/api/pedidos', platoPedidoRouter);
app.use('/api/pedidos', bebidaPedidoRouter);
app.use('/api/clientes', pedidoResenaRouter);
app.use('/api/pedidos', getResenaRouter);
app.use('/api/pedidos', pedidoRouter);
app.use('/api/resenas', resenaRouter);
app.use('/api/proveedores', proveedorRouter);
app.use('/api/tarjetas', tarjetaRouter);
app.use('/api/mesas', mesaRouter);
app.use('/api/bebidas', bebidaDeProveedorRouter);
app.use('/api/bebidas', bebidaRouter);
app.use((req, res) => {
    return res.status(404).send({ message: 'Recurso no encontrado' });
});
await syncSchema();
app.listen(port, () => {
    console.log(`Server running in: http://localhost:${port}/`);
});
export { app };
//# sourceMappingURL=app.js.map