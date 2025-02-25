import { Router } from "express"
import { add, findAll, findOne, remove, update } from "./proveedor.controller.js"
import { verificarToken } from "../shared/authMiddleware.js"


export const proveedorRouter = Router()

proveedorRouter.get('/', verificarToken, findAll)
proveedorRouter.get('/:id', verificarToken, findOne)
proveedorRouter.post('/', verificarToken, add)
proveedorRouter.put('/:id', verificarToken, update)
proveedorRouter.patch('/:id', verificarToken, update)
proveedorRouter.delete('/:id', verificarToken, remove)