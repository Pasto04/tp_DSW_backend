import { NextFunction, Request, Response } from "express";
import { orm } from "../shared/db/orm.js";
import { Proveedor } from "../proveedor/proveedor.entity.js";
import { IngredienteDeProveedor } from "./ingredienteDeProveedor.entity.js";
import { Ingrediente } from "../ingrediente/ingrediente.entity.js";


const em = orm.em

function sanitizeProveedorDeIngrediente(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedProveedorDeIngrediente = {
    ingrediente: req.body.ingrediente,
    proveedor: req.params.cuit,
    stock: req.body.stock
  }

  Object.keys(req.body.sanitizedProveedorDeIngrediente).forEach((keys) => {
    if (req.body.sanitizedProveedorDeIngrediente[keys] === undefined) {
      delete req.body.sanitizedProveedorDeIngrediente[keys]
    }
  })
  next()
}

async function findAllProvDeIngre(req: Request, res: Response) {
  try {
    const cuit = req.params.cuit
    const proveedor = await em.findOneOrFail(Proveedor, {cuit})
    const provDeIngre = await em.find(IngredienteDeProveedor, {proveedor}, {populate: ['ingrediente', 'proveedor']})
    res.status(200).json({message: `El stock de los ingredientes del proveedor ${proveedor.razonSocial} han sido encontrados con éxito`, data: provDeIngre})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function addProvDeIngre(req: Request, res: Response) {
  try {
    const provDeingre = em.create(IngredienteDeProveedor, req.body.sanitizedProveedorDeIngrediente)
    await em.flush()
    res.status(201).json({data: provDeingre})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function updateProvDeIngre(req: Request, res: Response) {
  try {
    const codigo = Number.parseInt(req.params.cod)
    const cuit = req.params.cuit
    const ingrediente = await em.findOneOrFail(Ingrediente, {codigo})
    const proveedor = await em.findOneOrFail(Proveedor, {cuit})
    const provDeIngre = await em.findOneOrFail(IngredienteDeProveedor, {ingrediente, proveedor})
    em.assign(provDeIngre, req.body.sanitizedProveedorDeIngrediente)
    await em.flush()
    res.status(200).json({message: `El stock del ingrediente "${ingrediente.descIngre}" del proveedor "${proveedor.razonSocial}" ha sido actualizado con éxito`, data: provDeIngre})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

export { sanitizeProveedorDeIngrediente, findAllProvDeIngre, addProvDeIngre, updateProvDeIngre }