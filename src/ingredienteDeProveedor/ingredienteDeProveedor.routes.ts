import { Router } from "express";
import { add, findAll, findOne, remove, sanitizeIngredienteDeProveedor, update } from "./ingredienteDeProveedor.controller.js";
import { addProvDeIngre, findAllProvDeIngre, sanitizeProveedorDeIngrediente, updateProvDeIngre } from "./proveedorDeIngrediente.controller.js";


export const ingredienteDeProveedorRouter = Router()

ingredienteDeProveedorRouter.get('/:cod/proveedores', findAll)
ingredienteDeProveedorRouter.get('/:cod/proveedores/:cuit', findOne)
ingredienteDeProveedorRouter.post('/:cod/proveedores', sanitizeIngredienteDeProveedor, add)
ingredienteDeProveedorRouter.patch('/:cod/proveedores/:cuit', sanitizeIngredienteDeProveedor, update)
ingredienteDeProveedorRouter.delete('/:cod/proveedores/:cuit', remove)

export const proveedorDeIngredienteRouter = Router()

proveedorDeIngredienteRouter.get('/:cuit/ingredientes', findAllProvDeIngre)
proveedorDeIngredienteRouter.get('/:cuit/ingredientes/:cod', findOne)
proveedorDeIngredienteRouter.post('/:cuit/ingredientes', sanitizeProveedorDeIngrediente, addProvDeIngre)
proveedorDeIngredienteRouter.patch('/:cuit/ingredientes/:cod', sanitizeProveedorDeIngrediente, updateProvDeIngre)
proveedorDeIngredienteRouter.delete('/:cuit/ingredientes/:cod', remove)
