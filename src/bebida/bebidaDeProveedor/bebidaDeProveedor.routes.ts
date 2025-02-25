import { Router } from "express"
import { findOne, add, sanitizeBebidaDeProveedor, remove } from "./bebidaDeProveedor.controller.js"
import { verificarToken } from "../../shared/authMiddleware.js"

export const bebidaDeProveedorRouter = Router()

bebidaDeProveedorRouter.get('/:codBebida/proveedores/:id', findOne)
bebidaDeProveedorRouter.post('/:codBebida/proveedores', verificarToken, sanitizeBebidaDeProveedor, add) //Puede utilizarse para agregar un nuevo proveedor a una bebida existente.
bebidaDeProveedorRouter.delete('/:codBebida/proveedores/:id', verificarToken, remove)