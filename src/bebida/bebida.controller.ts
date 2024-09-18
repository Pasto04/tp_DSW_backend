import { Request, Response } from "express";
import { orm } from "../shared/db/orm.js";
import { Bebida } from "./bebida.entity.js";
import { Proveedor } from "../proveedor/proveedor.entity.js";
import { validarBebida, validarBebidaPatch } from "./bebida.schema.js";
import { BebidaPreconditionFailed } from "../shared/errors/entityErrors/bebida.errors.js";
import { handleErrors } from "../shared/errors/errorHandler.js";

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

// Validamos que, si no hay proveedores registrados, no se puedan agregar bebidas
// Todavía debemos sincronizar la creación de bebidas con la creación de "BebidaDeProveedor".
async function add(req: Request, res: Response) {
  try{
    if ((await em.find(Proveedor, {})).length === 0) {
      throw new BebidaPreconditionFailed
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