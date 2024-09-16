import { Request,Response,NextFunction } from "express"
import { Mesa } from "./mesa.entity.js"
import { orm } from "../shared/db/orm.js"
import { z } from "zod"
import { validarMesa, validarMesaToPatch } from "./mesa.schema.js"
import crypto from 'node:crypto'

const em = orm.em

function handleErrors(error: any, res: Response) {
  if (error instanceof z.ZodError) {
    res.status(400).json({message: JSON.parse(error.message)[0].message})
  } else if (error.name === 'NotFoundError') {
    res.status(404).json({message: 'La mesa no ha sido encontrada'})
  } else {
    res.status(500).json({message: error.message})
  }
}

async function findAll(req:Request,res:Response) {
  try{
    if (req.query.estado){
      const estado = req.query.estado as string
      const mesas = await em.find(Mesa, {estado})
      res.status(200).json({message: `Todas las mesas con estado ${estado} encontradas`, data: mesas})
    } else {
      const mesas = await em.find(Mesa, {})
      res.status (200).json({message: 'Todas las mesas encontradas', data: mesas})
    }
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function findOne(req:Request,res:Response) {
  try{
    const nroMesa = Number.parseInt(req.params.nroMesa)
    const mesa = await em.findOneOrFail(Mesa, {nroMesa})
    const newCodigo = { codigo: crypto.randomUUID() }
    em.assign(mesa, newCodigo)
    await em.flush()
    res.status(200).json({message: 'Mesa encontrada exitosamente', data: mesa})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function add(req:Request,res:Response) {
  try{
    const mesaValida = validarMesa(req.body)
    const mesa = em.create(Mesa, mesaValida)
    await em.flush()
    res.status(201).json({message: 'Mesa creada con éxito', data:mesa})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function update(req:Request,res:Response){
  try{
    const nroMesa = Number.parseInt(req.params.nroMesa)
    const mesaToUpdate = await em.findOneOrFail(Mesa, {nroMesa})
    let mesaUpdated
    if(req.method === 'PATCH'){
      mesaUpdated = validarMesaToPatch(req.body)
    } else {
      mesaUpdated = validarMesa(req.body)
    }
    em.assign(mesaToUpdate, mesaUpdated)
    await em.flush()
    res.status(200).json({message: 'Mesa actualizada con éxito', data: mesaToUpdate})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function remove(req:Request,res:Response) {
    try {
    const nroMesa = Number.parseInt(req.params.nroMesa)
    const mesa = await em.findOneOrFail(Mesa, {nroMesa})
    em.removeAndFlush(mesa)
    res.status(200).json({message: 'La mesa ha sido eliminada con éxito', data: mesa})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

export {findAll,findOne,add,update,remove}