import express from 'express'
import { tipoIngredienteRouter } from './tipo-ingrediente/tipo-ingrediente.routes.js'
import { ingredienteRouter } from './ingrediente/ingrediente.routes.js'
import { clienteRouter } from './cliente/cliente.routes.js'

const port = 3000
const app = express()
app.use(express.json())

app.use('/api/tiposIngrediente', tipoIngredienteRouter)

app.use('/api/ingredientes', ingredienteRouter)

app.use('/api/cliente',clienteRouter)

app.use((req, res) => {
  return res.status(404).send({message: 'Recurso no encontrado'})
})

app.listen(port, () => {
  console.log(`Server running in: http://localhost:${port}/`)
})

