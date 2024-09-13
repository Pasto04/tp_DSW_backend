import { NextFunction, Request, Response } from "express";
import { orm } from "../shared/db/orm.js";
import { Bebida } from "./bebida.entity.js";
import { NotFoundError } from "@mikro-orm/core";


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
  if (error.message === 'El código de bebida debe ser de tipo numérico' || error.message === 'La descripción debe ser de tipo string' || error.message === 'La unidad de medida debe ser de tipo string' || error.message === 'El contenido debe ser de tipo numérico') {
    res.status(422).json({message: error.message})
  } else if (error = NotFoundError){
    res.status(404).json({message: `La bebida no ha sido encontrada`})
  } else {
    res.status(500).json({message: error.message})
  }
}

function validarRequest(req: {codBebida?: number, descripcion?: string, unidadMedida?: string, contenido?: string}) {
  if (req.codBebida !== undefined && typeof req.codBebida !== 'number') {
    const newError = new Error('El código de bebida debe ser de tipo numérico')
    throw newError
  } else if (req.descripcion !== undefined && typeof req.descripcion !== 'string') {
    const newError = new Error('La descripción debe ser de tipo string')
    throw newError
  } else if (req.unidadMedida !== undefined && typeof req.unidadMedida !== 'string') {
    const newError = new Error('La unidad de medida debe ser de tipo string')
    throw newError
  } else if (req.contenido !== undefined && typeof req.contenido !== 'number') {
    const newError = new Error('El contenido debe ser de tipo numérico')
    throw newError
  } 
  return 
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

async function add(req: Request, res: Response) {
  try{
    validarRequest(req.body)
    const bebida = em.create(Bebida, req.body)
    await em.flush()
    res.status(201).json({data: bebida})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

async function update(req: Request, res: Response) {
  try{
    validarRequest(req.body)
    const codBebida = Number.parseInt(req.params.codBebida)
    const bebida = await em.findOneOrFail(Bebida, {codBebida})
    em.assign(bebida, req.body)
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