import { Router } from "express";
import { add, findAll, findOne, remove, update } from "./proveedor.controller.js";


export const proveedorRouter = Router()

proveedorRouter.get('/', findAll)
proveedorRouter.get('/:cuit', findOne)
proveedorRouter.post('/', add)
proveedorRouter.put('/:cuit', update)
proveedorRouter.patch('/:cuit', update)
proveedorRouter.delete('/:cuit', remove)