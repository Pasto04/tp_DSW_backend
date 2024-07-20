import express from 'express'
import { pedidoRouter } from './pedido/pedido.routes.js'

const app = express ()
app.use(express.json())

app.use('/api/pedido',pedidoRouter)

app.use((_,res)=>{
  return res.status (404).send ({message: 'Resource not found'})
})

app.listen(3000, () => {
  console.log ('Server running on http:// localhost:3000/')
})
