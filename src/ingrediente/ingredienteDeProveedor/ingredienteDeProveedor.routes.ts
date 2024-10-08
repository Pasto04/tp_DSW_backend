import { Router } from "express";
import { add, findOne, remove, sanitizeIngredienteDeProveedor, /*update*/ } from "./ingredienteDeProveedor.controller.js";


export const ingredienteDeProveedorRouter = Router()

ingredienteDeProveedorRouter.get('/:cod/proveedores/:id', findOne)
ingredienteDeProveedorRouter.post('/:cod/proveedores', sanitizeIngredienteDeProveedor, add)
ingredienteDeProveedorRouter.delete('/:cod/proveedores/:id', remove)