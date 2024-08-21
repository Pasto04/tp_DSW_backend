import { Router } from 'express'
import { sanitizePlatoPedido, findAll, remove, update, add } from './platoPedido.controller.js'
import { findOne } from './platoPedido.controller.js'
export const platoPlatoRouter = Router()

export const platoPedRouter = Router()

//Trabajo asumiendo que puedo utilizar el mismo router en app.ts con 2 URLs distintnas
platoPedRouter.get('/:nro/pedidos', findAll)

platoPedRouter.get('/:nro/pedidos/:nroPed', findOne)

platoPedRouter.post('/:nro/pedidos', /*(req, res)=> {console.log(JSON.stringify(req))},*/sanitizePlatoPedido, add)

platoPedRouter.patch('/:nro/pedidos/:nroPed', sanitizePlatoPedido, update)

platoPedRouter.delete('/:nro/pedidos/:nroPed', remove)