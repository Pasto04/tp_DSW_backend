import { Router } from "express"
import { add, findAll, findOne, remove, update } from "./proveedor.controller.js"
import { verificarToken } from "../shared/authMiddleware.js"


export const proveedorRouter = Router()

proveedorRouter.get('/', verificarToken, findAll)
proveedorRouter.get('/:id', findOne)
proveedorRouter.post('/', add)
proveedorRouter.put('/:id', update)
proveedorRouter.patch('/:id', update)
proveedorRouter.delete('/:id', remove)