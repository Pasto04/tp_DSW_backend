import { Router } from "express"
import { add, findOne, remove, sanitizeIngredienteDeProveedor, /*update*/ } from "./ingredienteDeProveedor.controller.js"
import { verificarToken } from "../../shared/authMiddleware.js"


export const ingredienteDeProveedorRouter = Router()

ingredienteDeProveedorRouter.get('/:cod/proveedores/:id', verificarToken, findOne)
ingredienteDeProveedorRouter.post('/:cod/proveedores', verificarToken, sanitizeIngredienteDeProveedor, add)
ingredienteDeProveedorRouter.delete('/:cod/proveedores/:id', verificarToken, remove)