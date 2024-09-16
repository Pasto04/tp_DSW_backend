import { NextFunction, Request, Response } from "express";
import { orm } from "../shared/db/orm.js";
import { Bebida } from "./bebida.entity.js";
import { NotFoundError } from "@mikro-orm/core";
import { Proveedor } from "../proveedor/proveedor.entity.js";
import { z } from "zod";
import { validarBebida, validarBebidaPatch } from "./bebida.schema.js";


const em = orm.em

/*function sanitizeBebida(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    codBebida: req.body.codBebida,
    descripcion: req.body.descripcion,
    unidadMedida: req.body.unidadMedida,
    contenido: req.body.contenido
  }

  Object.keys(req.body.sanitizedInput).forEach((keys) => {
    if (req.body.sanitizedInput[keys] === undefined) {
      delete req.body.sanitizedInput[keys]
    }
  })
  next()
}*/

function handleErrors(error: any, res: Response) {
  if (error instanceof z.ZodError) {
    res.status(400).json({message: JSON.parse(error.message)[0].message})
  } else if (error.name = 'NotFoundError'){
    res.status(404).json({message: `La bebida no ha sido encontrada`})
  } else {
    res.status(500).json({message: error.message})
  }
}

async function findAll(req: Request, res: Response) {
  try{
    const bebidas = await em.find(Bebida, {})
    res.status(200).json({message: `Todas las bebidas han sido encontradas con éxito`, data: bebidas})
  } catch(error: any){
    handleErrors(error, res)
  }
}

async function findOne(req: Request, res: Response) {
  try{
    const codBebida = Number.parseInt(req.params.codBebida)
    const bebida = await em.findOneOrFail(Bebida, {codBebida})
    res.status(200).json({message: `La bebida ${bebida.descripcion} ha sido encontrada con éxito`, data: bebida})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

// Quiero validar que, antes de crear una nueva bebida, ya haya al menos un proveedor registrado
// Falta sincronizar con la creación de un "BebidaDeProveedor".
async function add(req: Request, res: Response) {
  try{
    if ((await em.find(Proveedor, {})).length === 0) {
      res.status(409).json({message: `No se pueden agregar bebidas si no hay proveedores registrados`})
    } else {
      const bebidaValida = validarBebida(req.body)
      const bebida = em.create(Bebida, bebidaValida)
      await em.flush()
      res.status(201).json({data: bebida})
    }
  } catch(error: any) {
    handleErrors(error, res)
  }
}

async function update(req: Request, res: Response) {
  try{
    const codBebida = Number.parseInt(req.params.codBebida)
    const bebida = await em.findOneOrFail(Bebida, {codBebida})
    let bebidaUpdated
    if (req.method === 'PATCH') {
      bebidaUpdated = validarBebidaPatch(req.body)
    } else {
      bebidaUpdated = validarBebida(req.body)
    }
    em.assign(bebida, bebidaUpdated)
    await em.flush()
    res.status(200).json({message: `La bebida ${bebida.descripcion} fue actualizada con éxito`, data: bebida})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

async function remove(req: Request, res: Response) {
  try{
    const codBebida = Number.parseInt(req.params.codBebida)
    const bebida = await em.findOneOrFail(Bebida, {codBebida})
    await em.removeAndFlush(bebida)
    res.status(200).json({message: `La bebida ${bebida.descripcion} ha sido eliminada con éxito`, data: bebida})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

export { findAll, findOne, add, update, remove, /*sanitizeBebida*/ }