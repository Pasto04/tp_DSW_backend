import { Proveedor } from "../proveedor/proveedor.entity.js";
import { orm } from "../shared/db/orm.js";
import { Ingrediente } from "./ingrediente.entity.js";
import { NextFunction, Request, Response } from "express";

const em = orm.em

function sanitizeIngrediente(req:Request, res:Response, next:NextFunction) {
  req.body.sanitizedIngrediente = {
    codigo: req.body.codigo,
    descIngre: req.body.descIngre,
    stock: req.body.stock,
    puntoDePedido: req.body.puntoDePedido,
    unidadMedida: req.body.unidadMedida,
    aptoCeliacos: req.body.aptoCeliacos,
    aptoVegetarianos: req.body.aptoVegetarianos,
    aptoVeganos: req.body.aptoVeganos
  }
  Object.keys(req.body.sanitizedIngrediente).forEach((keys) => {
    if(req.body.sanitizedIngrediente[keys] === undefined) {
      delete req.body.sanitizedIngrediente[keys]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const ingre = await em.find(Ingrediente, {})
    res.status(200).json({message: 'Todos los ingredientes fueron encontrados con éxito', data: ingre})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const codigo = Number.parseInt(req.params.cod)
    const ingre = await em.findOneOrFail(Ingrediente, {codigo})
    res.status(200).json({message: `El ingrediente ${ingre.descIngre} fue hallado con éxito`, data: ingre})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

async function add(req: Request, res: Response) {
  try {
    if ((await em.find(Proveedor, {})).length === 0) {
      res.status(409).json({message: `No se pueden agregar ingredientes si no hay proveedores registrados`}) 
    } else {
      const ingre = em.create(Ingrediente, req.body.sanitizedIngrediente)
      await em.flush()
      res.status(201).json({message: `El ingrediente ${ingre.descIngre} fue creado con éxito`, data: ingre})
    }
    } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

async function update(req: Request, res: Response) {
    try {
    const codigo = Number.parseInt(req.params.cod)
    const ingre = await em.findOneOrFail(Ingrediente, {codigo})
    em.assign(ingre, req.body.sanitizedIngrediente)
    await em.flush()
    res.status(200).json({message: `El ingrediente ${ingre.descIngre} ha sido actualizado con éxito`, data: req.body.sanitizedIngrediente})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

async function remove(req: Request, res: Response) {
    try {
    const codigo = Number.parseInt(req.params.cod)
    const ingre = await em.findOneOrFail(Ingrediente, {codigo})
    await em.removeAndFlush(ingre)
    res.status(200).json({message: `El ingrediente ${ingre.descIngre} ha sido eliminado con éxito`, data: ingre})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

export { sanitizeIngrediente, findAll, findOne, add, update, remove }