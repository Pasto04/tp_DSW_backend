import { z } from "zod";
import { Proveedor } from "../proveedor/proveedor.entity.js";
import { orm } from "../shared/db/orm.js";
import { Ingrediente } from "./ingrediente.entity.js";
import { Request, Response } from "express";
import { validarIngrediente, validarIngredientePatch } from "./ingrediente.schema.js";

const em = orm.em

function handleErrors(error: any, res: Response) {
  if(error instanceof z.ZodError) {
    res.status(400).json({message: JSON.parse(error.message)[0].message})
  } else if (error.name === 'NotFoundError') {
    res.status(404).json({message: 'El ingrediente no ha sido encontrado'})
  } else if (error.name === 'UniqueConstraintViolationException'){
    res.status(400).json({message: 'El ingrediente ya existe'})
  } else {
    res.status(500).json({message: error.message})
  }
}

async function findAll(req: Request, res: Response) {
  try {
    const ingre = await em.find(Ingrediente, {})
    res.status(200).json({message: 'Todos los ingredientes fueron encontrados con éxito', data: ingre})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const codigo = Number.parseInt(req.params.cod)
    const ingre = await em.findOneOrFail(Ingrediente, {codigo})
    res.status(200).json({message: `El ingrediente ${ingre.descIngre} fue hallado con éxito`, data: ingre})
  } catch(error: any) {
    handleErrors(error, res)
  }
}


// Validamos que, si no hay proveedores registrados, no se puedan agregar ingredientes
// Todavía debemos sincronizar la creación de ingredientes con la creación de "IngredienteDeProveedor".
async function add(req: Request, res: Response) {
  try {
    if ((await em.find(Proveedor, {})).length === 0) {
      res.status(409).json({message: `No se pueden agregar ingredientes si no hay proveedores registrados`}) 
    } else {
      const ingredienteValido = validarIngrediente(req.body)
      const ingre = em.create(Ingrediente, ingredienteValido)
      await em.flush()
      res.status(201).json({message: `El ingrediente ${ingre.descIngre} fue creado con éxito`, data: ingre})
    }
    } catch(error: any) {
    handleErrors(error, res)
  }
}

async function update(req: Request, res: Response) {
  try {
    const codigo = Number.parseInt(req.params.cod)
    const ingre = await em.findOneOrFail(Ingrediente, {codigo})
    let ingreUpdated
    if(req.method === 'PATCH') {
      ingreUpdated = validarIngredientePatch(req.body)
    } else {
      ingreUpdated = validarIngrediente(req.body)
    }
    em.assign(ingre, ingreUpdated)
    await em.flush()
    res.status(200).json({message: `El ingrediente ${ingre.descIngre} ha sido actualizado con éxito`, data: ingre})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

async function remove(req: Request, res: Response) {
    try {
    const codigo = Number.parseInt(req.params.cod)
    const ingre = await em.findOneOrFail(Ingrediente, {codigo})
    await em.removeAndFlush(ingre)
    res.status(200).json({message: `El ingrediente ${ingre.descIngre} ha sido eliminado con éxito`, data: ingre})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

export { findAll, findOne, add, update, remove }