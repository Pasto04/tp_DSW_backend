import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/db/orm.js";
import { Ingrediente } from "../ingrediente/ingrediente.entity.js";
import { IngredienteDeProveedor } from "./ingredienteDeProveedor.entity.js";
import { Proveedor } from "../proveedor/proveedor.entity.js";

const em = orm.em

function sanitizeIngredienteDeProveedor(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedIngredienteDeProveedor = {
    ingrediente: req.params.cod,
    proveedor: req.body.proveedor,
    stock: req.body.stock
  }

  Object.keys(req.body.sanitizedIngredienteDeProveedor).forEach((keys) => {
    if (req.body.sanitizedIngredienteDeProveedor[keys] === undefined) {
      delete req.body.sanitizedIngredienteDeProveedor[keys]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const codigo = Number.parseInt(req.params.cod)
    const ingrediente = await em.findOneOrFail(Ingrediente, {codigo})
    const ingresDeProv = await em.find(IngredienteDeProveedor, {ingrediente}, {populate: ['ingrediente', 'proveedor']})
    res.status(200).json({message: `Los proveedores del ingrediente "${ingrediente.descIngre}" han sido encontrados con éxito`, data: ingresDeProv})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const codigo = Number.parseInt(req.params.cod)
    const id = Number.parseInt(req.params.id)
    const ingrediente = await em.findOneOrFail(Ingrediente, {codigo})
    const proveedor = await em.findOneOrFail(Proveedor, {id})
    const ingreDeProv = await em.findOneOrFail(IngredienteDeProveedor, {ingrediente, proveedor}, {populate: ['ingrediente', 'proveedor']})
    res.status(200).json({message: `El proveedor de cuit "${proveedor.cuit}" del ingrediente "${ingrediente.descIngre}" ha sido encontrado con éxito`, data: ingreDeProv})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function add(req: Request, res: Response) {
  try {
    const ingreDeProv = em.create(IngredienteDeProveedor, req.body.sanitizedIngredienteDeProveedor)
    await em.flush()
    res.status(201).json({data: ingreDeProv})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {
    const codigo = Number.parseInt(req.params.cod)
    const id = Number.parseInt(req.params.id)
    const ingrediente = await em.findOneOrFail(Ingrediente, {codigo})
    const proveedor = await em.findOneOrFail(Proveedor, {id})
    const ingreDeProv = await em.findOneOrFail(IngredienteDeProveedor, {ingrediente, proveedor})
    em.assign(ingreDeProv, req.body.sanitizedIngredienteDeProveedor)
    await em.flush()
    res.status(200).json({message: `El proveedor de cuit "${proveedor.cuit}" del ingrediente "${ingrediente.descIngre}" ha sido actualizado con éxito`, data: ingreDeProv})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function remove(req: Request, res: Response) {
  try {
    const codigo = Number.parseInt(req.params.cod)
    const id = Number.parseInt(req.params.id)
    const ingrediente = await em.findOneOrFail(Ingrediente, {codigo})
    const proveedor = await em.findOneOrFail(Proveedor, {id})
    const ingreDeProv = await em.findOneOrFail(IngredienteDeProveedor, {ingrediente, proveedor})
    await em.removeAndFlush(ingreDeProv)
    res.status(200).json({message: `El proveedor de cuit "${proveedor.cuit}" del ingrediente "${ingrediente.descIngre}" ha sido eliminado con éxito`, data: ingreDeProv})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

export { sanitizeIngredienteDeProveedor, findAll, findOne, add, update, remove }