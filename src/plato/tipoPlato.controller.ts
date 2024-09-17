import { Request, Response, NextFunction } from 'express'
import { TipoPlato } from './tipoPlato.entity.js'
import { orm } from '../shared/db/orm.js'
import { z } from 'zod'
import { validarTipoPlato } from './tipoPlato.schema.js'

const em = orm.em

em.getRepository(TipoPlato)

function handleErrors(error: any, res: Response) {
  if(error instanceof z.ZodError) {
    res.status(400).json({message: JSON.parse(error.message)[0].message})
  } else if (error.name === 'NotFoundError') {
    res.status(404).json({message: 'El tipo de plato no fue encontrado'})
  } else if (error.name === 'UniqueConstraintViolationException') {
    res.status(400).json({message: 'El tipo de plato ya existe'})
  } else {
    res.status(500).json({message: error.message})
  }
}

async function findAll(req:Request, res:Response) {
  try{
    const tiposPlato = await em.find(TipoPlato, {})
    res.status(200).json({message: 'Todos los tipos de plato fueron encontrados', data: tiposPlato})
  } catch(error: any) {
    handleErrors(error, res)
  }
  
}

async function findOne(req:Request, res:Response) {
  try{
    const numTipoPlato = Number.parseInt(req.params.numPlato)
    const tipoPlato = await em.findOneOrFail(TipoPlato, { numPlato: numTipoPlato })
    res.status(200).json({message: `El tipo de plato ${tipoPlato.descTPlato[0]} fue encontrado con éxito`, data: tipoPlato})
  } catch(error: any) {
    handleErrors(error, res)
  }
  
}

async function add(req:Request, res:Response) {
  try{
    const tipoPlatoValido = validarTipoPlato(req.body)
    const tipoPlato = em.create(TipoPlato, tipoPlatoValido)
    await em.flush(),
    res.status(201).json({message: `El tipo de plato ${tipoPlato.descTPlato[0]} fue creado con éxito`, data: tipoPlato})
  } catch(error: any){
    handleErrors(error, res)
  }
}

async function update(req:Request, res:Response) {
  try{
    const numPlato = Number.parseInt(req.params.numPlato)
    const tipoPlato = await em.findOneOrFail(TipoPlato, {numPlato}) 
    const tipoPlatoUpdated = validarTipoPlato(req.body)
    em.assign(tipoPlato, tipoPlatoUpdated)
    await em.flush()
    res.status(200).json({message: `El tipo de plato ${tipoPlato.descTPlato[0]} fue actualizado con éxito`, data: tipoPlato})
  } catch(error: any){
    handleErrors(error, res)
  }
}

async function remove (req: Request, res: Response,) {
  try {
    const numPlato = Number.parseInt(req.params.numPlato)
    const deletedTipoPlato = await em.findOneOrFail(TipoPlato, {numPlato}) 
    await em.removeAndFlush(deletedTipoPlato)
    res.status(200).json({message: `El tipo de plato ${deletedTipoPlato.descTPlato[0]} ha sido eliminado con éxito`, data: deletedTipoPlato})
  } catch(error: any){
    handleErrors(error, res)
  }
}

export {findAll, findOne, add, update, remove }