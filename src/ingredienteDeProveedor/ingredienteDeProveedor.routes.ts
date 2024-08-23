import { Router } from "express";
import { add, findAll, findOne, remove, sanitizeIngredienteDeProveedor, update } from "./ingredienteDeProveedor.controller.js";
import { addProvDeIngre, findAllProvDeIngre, sanitizeProveedorDeIngrediente, updateProvDeIngre } from "./proveedorDeIngrediente.controller.js";


export const ingredienteDeProveedorRouter = Router()

ingredienteDeProveedorRouter.get('/:cod/proveedores', findAll)
ingredienteDeProveedorRouter.get('/:cod/proveedores/:id', findOne)
ingredienteDeProveedorRouter.post('/:cod/proveedores', sanitizeIngredienteDeProveedor, add)
ingredienteDeProveedorRouter.patch('/:cod/proveedores/:id', sanitizeIngredienteDeProveedor, update)
ingredienteDeProveedorRouter.delete('/:cod/proveedores/:id', remove)

export const proveedorDeIngredienteRouter = Router()

proveedorDeIngredienteRouter.get('/:id/ingredientes', findAllProvDeIngre)
proveedorDeIngredienteRouter.get('/:id/ingredientes/:cod', findOne)
proveedorDeIngredienteRouter.post('/:id/ingredientes', sanitizeProveedorDeIngrediente, addProvDeIngre)
proveedorDeIngredienteRouter.patch('/:id/ingredientes/:cod', sanitizeProveedorDeIngrediente, updateProvDeIngre)
proveedorDeIngredienteRouter.delete('/:id/ingredientes/:cod', remove)
