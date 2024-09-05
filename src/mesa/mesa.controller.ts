import { Request,Response,NextFunction } from "express"
import { Mesa } from "./mesa.entity.js"
import { orm } from "../shared/db/orm.js"

const em = orm.em

async function sanitizeMesaInput(req:Request, res:Response, next:NextFunction){
  req.body.sanitizedInput = {
    nroMesa: req.body.nroMesa,
    cantPersonasMax: req.body.cantPersonasMax,
    estado: req.body.estado
  }

  Object.keys(req.body.sanitizedInput).forEach(key => {
    if(req.body.sanitizedInput [key] === undefined){
      delete req.body.sanitizedInput [key]
    }
  })
  next()
}

async function findAll(req:Request,res:Response) {
  try{
    const mesas = await em.find(Mesa, {})
    res.status (200).json({message: 'Todas las mesas encontradas', data: mesas})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function findOne(req:Request,res:Response) {
  try{
    const nroMesa = Number.parseInt(req.params.nroMesa)
    const mesa = await em.findOneOrFail(Mesa, {nroMesa})
    res.status(200).json({message: 'Mesa encontrado exitosamente', data: mesa})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function add(req:Request,res:Response) {
  try{
    const mesa = em.create(Mesa, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({message: 'Mesa creada con éxito', data:mesa})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function update (req:Request,res:Response){
  try{
    const nroMesa = Number.parseInt(req.params.nroMesa)
    const mesaToUpdate = await em.findOneOrFail(Mesa, {nroMesa})
    em.assign(mesaToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({message: 'Mesa actualizada con éxito', data: mesaToUpdate})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function remove (req:Request,res:Response) {
    try {
    const nroMesa = Number.parseInt(req.params.nroMesa)
    const mesa = await em.findOneOrFail(Mesa, {nroMesa})
    em.removeAndFlush(mesa)
    res.status(200).json({message: 'La mesa ha sido eliminada con éxito', data: mesa})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

export {sanitizeMesaInput,findAll,findOne,add,update,remove}