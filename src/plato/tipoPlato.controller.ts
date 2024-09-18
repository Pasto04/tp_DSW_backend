import { Request, Response } from 'express'
import { TipoPlato } from './tipoPlato.entity.js'
import { orm } from '../shared/db/orm.js'
import { validarTipoPlato } from './tipoPlato.schema.js'
import { handleErrors } from '../shared/errors/errorHandler.js'
import { TipoPlatoNotFoundError } from '../shared/errors/entityErrors/tipoPlato.errors.js'

const em = orm.em

em.getRepository(TipoPlato)

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
    const tipoPlato = await em.findOneOrFail(TipoPlato, { numPlato: numTipoPlato }, {failHandler: () => {throw new TipoPlatoNotFoundError}})
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
    const tipoPlato = await em.findOneOrFail(TipoPlato, { numPlato: numPlato }, {failHandler: () => {throw new TipoPlatoNotFoundError}})
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
    const deletedTipoPlato = await em.findOneOrFail(TipoPlato, {numPlato}, {failHandler: () => {throw new TipoPlatoNotFoundError}}) 
    await em.removeAndFlush(deletedTipoPlato)
    res.status(200).json({message: `El tipo de plato ${deletedTipoPlato.descTPlato[0]} ha sido eliminado con éxito`, data: deletedTipoPlato})
  } catch(error: any){
    handleErrors(error, res)
  }
}

export {findAll, findOne, add, update, remove }