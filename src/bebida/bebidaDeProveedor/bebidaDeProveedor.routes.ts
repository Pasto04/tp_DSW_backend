import { Router } from "express"
import { findAll, findOne, add, /*update,*/ remove } from "./bebidaDeProveedor.controller.js"

export const bebidaDeProveedorRouter = Router()

bebidaDeProveedorRouter.get('/:codBebida/proveedores', findAll)
bebidaDeProveedorRouter.get('/:codBebida/proveedores/:id', findOne)
bebidaDeProveedorRouter.post('/:codBebida/proveedores', add) //Puede utilizarse para agregar un nuevo proveedor a una bebida existente.
/*bebidaDeProveedorRouter.patch('/:codBebida/proveedores/:id', update)*/
bebidaDeProveedorRouter.delete('/:codBebida/proveedores/:id', remove)