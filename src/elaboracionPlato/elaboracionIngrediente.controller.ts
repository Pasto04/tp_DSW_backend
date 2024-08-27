import { NextFunction, Request, Response } from "express";
import { orm } from "../shared/db/orm.js";
import { Ingrediente } from "../ingrediente/ingrediente.entity.js";
import { ElaboracionPlato } from "./elaboracionPlato.entity.js";
import { Platform } from "@mikro-orm/core";
import { Plato } from "../plato/plato.entity.js";

const em = orm.em

function sanitizeElabIngre(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedElabIngre = {
    ingrediente: req.params.cod,
    plato: req.body.plato,
    cantidadNecesaria: req.body.cantidadNecesaria
  }

  Object.keys(req.body.sanitizedElabIngre).forEach((keys) => {
    if (req.body.sanitizedElabIngre[keys] === undefined) {
      delete req.body.sanitizedElabIngre[keys]
    }
  })
  next()
}

async function findAllElabIngre(req: Request, res: Response) {
  try {
    const codigo = Number.parseInt(req.params.cod)
    const ingrediente = await em.findOneOrFail(Ingrediente, {codigo})
    const elabIngre = await em.find(ElaboracionPlato, {ingrediente}, {populate: ['ingrediente', 'plato']})
    res.status(200).json({message: `Los platos en los que se utiliza el ingrediente ${ingrediente.descIngre} han sido encontrados con éxito`, data: elabIngre})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function addElabIngre(req: Request, res: Response) {
  try {
    const elabIngre = em.create(ElaboracionPlato, req.body.sanitizedElabIngre)
    await em.flush()
    res.status(201).json({data: elabIngre})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function updateElabIngre(req: Request, res: Response) {
  try {
    const codigo = Number.parseInt(req.params.cod)
    const ingrediente = await em.findOneOrFail(Ingrediente, {codigo})
    const numPlato = Number.parseInt(req.params.nro)
    const plato = await em.findOneOrFail(Plato, {numPlato}, {populate: ['tipoPlato']})
    const elabIngre = await em.findOneOrFail(ElaboracionPlato, {ingrediente, plato}, {populate: ['ingrediente', 'plato']})
    em.assign(elabIngre, req.body.sanitizedElabIngre)
    await em.flush()
    res.status(200).json({message: `La cantidad del ingrediente ${ingrediente.descIngre} para el plato ${plato.descripcion} ha sido actualizada con éxito`, data: elabIngre})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

export { sanitizeElabIngre, findAllElabIngre, addElabIngre, updateElabIngre }