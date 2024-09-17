import { Router } from "express";
import { add, findAll, findOne, remove, /*update*/ } from "./ingredienteDeProveedor.controller.js";
import { addProvDeIngre, findAllProvDeIngre, /*updateProvDeIngre*/ } from "./proveedorDeIngrediente.controller.js";


export const ingredienteDeProveedorRouter = Router()

ingredienteDeProveedorRouter.get('/:cod/proveedores', findAll)
ingredienteDeProveedorRouter.get('/:cod/proveedores/:id', findOne)
ingredienteDeProveedorRouter.post('/:cod/proveedores', add)
ingredienteDeProveedorRouter.delete('/:cod/proveedores/:id', remove)


// ELIMINAR MÁS TARDE, CUANDO REESTRUCTUREMOS LAS RUTAS DE LA API
export const proveedorDeIngredienteRouter = Router()

proveedorDeIngredienteRouter.get('/:id/ingredientes', findAllProvDeIngre)
proveedorDeIngredienteRouter.get('/:id/ingredientes/:cod', findOne)
proveedorDeIngredienteRouter.post('/:id/ingredientes', addProvDeIngre)
proveedorDeIngredienteRouter.delete('/:id/ingredientes/:cod', remove)
