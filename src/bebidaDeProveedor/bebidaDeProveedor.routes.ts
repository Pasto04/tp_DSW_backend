import { Router } from "express"
import { findAll, findOne, add, update, remove, sanitizeBebidaDeProveedor } from "./bebidaDeProveedor.controller.js"

export const bebidaDeProveedorRouter = Router()

bebidaDeProveedorRouter.get('/:codBebida/proveedores', findAll)
bebidaDeProveedorRouter.get('/:codBebida/proveedores/:id', findOne)
bebidaDeProveedorRouter.post('/:codBebida/proveedores', sanitizeBebidaDeProveedor, add)
bebidaDeProveedorRouter.patch('/:codBebida/proveedores/:id', sanitizeBebidaDeProveedor, update)
bebidaDeProveedorRouter.delete('/:codBebida/proveedores/:id', remove)