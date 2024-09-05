import { Request, Response } from "express";
import { orm } from "../shared/db/orm.js";
import { Bebida } from "./bebida.entity.js";


const em = orm.em

em.getRepository(Bebida)

async function findAll(req: Request, res: Response) {
  try{
    const bebidas = await em.find(Bebida, {})
    res.status(200).json({message: `Todas las bebidas han sido encontradas con éxito`, data: bebidas})
  } catch(error: any){
    res.status(500).json({message: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  try{
    const codBebida = Number.parseInt(req.params.codBebida)
    const bebida = await em.findOneOrFail(Bebida, {codBebida})
    res.status(200).json({message: `La bebida ${bebida.descripcion} ha sido encontrada con éxito`, data: bebida})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

async function add(req: Request, res: Response) {
  try{
    const bebida = em.create(Bebida, req.body)
    await em.flush()
    res.status(201).json({data: bebida})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

async function update(req: Request, res: Response) {
  try{
    const codBebida = Number.parseInt(req.params.codBebida)
    const bebida = await em.findOneOrFail(Bebida, {codBebida})
    em.assign(bebida, req.body)
    await em.flush()
    res.status(200).json({message: `La bebida ${bebida.descripcion} fue actualizada con éxito`, data: bebida})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

async function remove(req: Request, res: Response) {
  try{
    const codBebida = Number.parseInt(req.params.codBebida)
    const bebida = await em.findOneOrFail(Bebida, {codBebida})
    await em.removeAndFlush(bebida)
    res.status(200).json({message: `La bebida ${bebida.descripcion} ha sido eliminada con éxito`, data: bebida})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

export { findAll, findOne, add, update, remove }