import 'reflect-metadata'
import { RequestContext } from '@mikro-orm/core'
import { orm, syncSchema } from './shared/db/orm.js'
import express from 'express'
import { tipoIngredienteRouter } from './ingrediente/tipoIngrediente.routes.js'
import { ingredienteRouter } from './ingrediente/ingrediente.routes.js'
import { tipoPlatoRouter } from './plato/tipoPlato.routes.js'
import { platoRouter } from './plato/plato.routes.js'
import { clienteRouter } from './cliente/cliente.routes.js'
import { pedidoRouter } from './pedido/pedido.routes.js'
import { platoPedRouter } from './platoPedido/platoPedido.routes.js'
import { platoPlatoRouter } from './platoPedido/platoPlato.routes.js'
import { reseñaRouter } from './pedido/reseña.routes.js'
/*import { elaboracionPlatoRouter } from './elaboracionPlato/elaboracionPlato.routes.js'
*/


const port = 3000
const app = express()
app.use(express.json())

//

app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})

//

app.use('/api/ingredientes/tipos', tipoIngredienteRouter)

app.use('/api/ingredientes', ingredienteRouter)

app.use('/api/platos/tipos', tipoPlatoRouter)

app.use('/api/platos', platoRouter)

app.use('/api/clientes', clienteRouter)

app.use('/api/platoPedidos', platoPedRouter)

app.use('/api/platoPlatos', platoPlatoRouter)

app.use('/api/pedidos',pedidoRouter)

app.use('/api/pedidos/reseña', reseñaRouter)

/*app.use('/api/elaboracionesPlato', elaboracionPlatoRouter)

app.use('/api/elaboracionesPlato', elaboracionPlatoRouter)


*/

app.use((req, res) => {
  return res.status(404).send({message: 'Recurso no encontrado'})
})

await syncSchema()

app.listen(port, () => {
  console.log(`Server running in: http://localhost:${port}/`)
})

