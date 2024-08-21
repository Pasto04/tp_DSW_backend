import { Request, Response, NextFunction } from 'express'
import { Reseña } from './reseña.entity.js'
import { Pedido } from './pedido.entity.js'
import { orm } from '../shared/db/orm.js'

const em = orm.em

function sanitizeReseña(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedReseña = {
    pedido: req.params.nroPed,
    fechaReseña: req.body.fechaReseña,
    cuerpo: req.body.cuerpo,
    puntaje: req.body.puntaje
  }

  Object.keys(req.body.sanitizedReseña).forEach((keys) => {
    if (req.body.sanitizedReseña[keys] === undefined) {
      delete req.body.sanitizedReseña[keys]
    }
  })
  next()
}

async function findAll(req:Request, res:Response) {
  try{
    const reseñas = await em.find(Reseña, {}, {populate: ['pedido']})
    res.status(200).json({message: `Todas las reseñas fueron encontradas`, data: reseñas})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
  
}

async function findOne(req:Request, res:Response) {
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, { nroPed: nroPed }, {populate: ['cliente']});
    const reseña = await em.findOneOrFail(Reseña, { pedido: pedido }, {populate: ['pedido']});
    res.status(200).json({message: `La reseña del pedido ${nroPed} fue encontrado con éxito`, data: reseña})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
  
}

async function add(req:Request, res:Response) {
  try{
    const reseña = em.create(Reseña, req.body.sanitizedReseña)
    await em.flush(),
    res.status(201).json({data: reseña})
  } catch(error: any){
    res.status(500).json({message: error.message})
  }
}

async function update(req:Request, res:Response) {
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, { nroPed: nroPed });
    const reseña = await em.findOneOrFail(Reseña, { pedido: pedido });
    em.assign(reseña, req.body.sanitizedReseña)
    await em.flush()
    res.status(200).json({message: `La reseña del pedido ${nroPed} fue actualizada con éxito`, data: reseña})
  } catch(error: any){
    res.status(500).json({message: error.message})
  }
}

async function remove (req: Request, res: Response,) {
  try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, { nroPed: nroPed });
    const deletedReseña = await em.findOneOrFail(Reseña, { pedido: pedido }) 
    await em.removeAndFlush(deletedReseña)
    res.status(200).json({message: `La reseña del pedido ${nroPed} ha sido eliminada con éxito`, data: deletedReseña})
  } catch(error: any){
    res.status(500).json({message: error.message})
  }
}

export {findAll, findOne, add, update, remove }