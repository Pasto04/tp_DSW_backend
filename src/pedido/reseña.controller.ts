import { Request, Response, NextFunction } from 'express'
import { Resena } from './reseña.entity.js'
import { Pedido } from './pedido.entity.js'
import { orm } from '../shared/db/orm.js'

const em = orm.em

function sanitizeResena(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedResena = {
    pedido: req.params.nroPed,
    fechaResena: req.body.fechaResena,
    cuerpo: req.body.cuerpo,
    puntaje: req.body.puntaje
  }

  Object.keys(req.body.sanitizedResena).forEach((keys) => {
    if (req.body.sanitizedResena[keys] === undefined) {
      delete req.body.sanitizedResena[keys]
    }
  })
  next()
}

async function findAll(req:Request, res:Response) {
  try{
    const resenas = await em.find(Resena, {}, {populate: ['pedido']})
    res.status(200).json({message: `Todas las reseñas fueron encontradas`, data: resenas})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
  
}

async function findOne(req:Request, res:Response) {
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, { nroPed: nroPed }, {populate: ['cliente']});
    const resena = await em.findOneOrFail(Resena, { pedido: pedido }, {populate: ['pedido']});
    res.status(200).json({message: `La reseña del pedido ${nroPed} fue encontrado con éxito`, data: resena})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
  
}

async function add(req:Request, res:Response) {
  try{
    const resena = em.create(Resena, req.body.sanitizedResena)
    await em.flush(),
    res.status(201).json({data: resena})
  } catch(error: any){
    res.status(500).json({message: error.message})
  }
}

async function update(req:Request, res:Response) {
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, { nroPed: nroPed });
    const resena = await em.findOneOrFail(Resena, { pedido: pedido });
    em.assign(resena, req.body.sanitizedResena)
    await em.flush()
    res.status(200).json({message: `La reseña del pedido ${nroPed} fue actualizada con éxito`, data: resena})
  } catch(error: any){
    res.status(500).json({message: error.message})
  }
}

async function remove (req: Request, res: Response,) {
  try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, { nroPed: nroPed });
    const deletedResena = await em.findOneOrFail(Resena, { pedido: pedido }) 
    await em.removeAndFlush(deletedResena)
    res.status(200).json({message: `La reseña del pedido ${nroPed} ha sido eliminada con éxito`, data: deletedResena})
  } catch(error: any){
    res.status(500).json({message: error.message})
  }
}

export {sanitizeResena, findAll, findOne, add, update, remove }