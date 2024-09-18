import { Router } from "express"
import { findAll, sanitizePlatoPlato, add, remove, update } from "./platoPlato(PENSAR EN ELIMINAR).controller.js"
import { findOne } from './platoPedido.controller.js'

export const platoPlatoRouter = Router()

platoPlatoRouter.get('/:nro/pedidos', findAll)
platoPlatoRouter.get('/:nro/pedidos/:nroPed', findOne)
platoPlatoRouter.post('/:nro/pedidos', sanitizePlatoPlato, add)
platoPlatoRouter.patch('/:nro/pedidos/:nroPed', sanitizePlatoPlato, update)
platoPlatoRouter.delete('/:nro/pedidos/:nroPed', remove)