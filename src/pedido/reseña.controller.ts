import { Request, Response, NextFunction } from 'express'
import { Resena } from './reseña.entity.js'
import { Pedido } from './pedido.entity.js'
import { orm } from '../shared/db/orm.js'
import { handleErrors } from '../shared/errors/errorHandler.js'
import { PedidoNotFoundError } from '../shared/errors/entityErrors/pedido.errors.js'
import { validarResena, validarResenaPatch } from './reseña.schema.js'
import { ResenaAlreadyExists, ResenaAPedidoNoFinalizado, ResenaNotFoundError } from '../shared/errors/entityErrors/reseña.errors.js'
import { validarFindAll } from '../shared/validarFindAll.js'


const em = orm.em

function sanitizeResena(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    pedido: req.params.nroPed,
    cuerpo: req.body.cuerpo,
    puntaje: req.body.puntaje
  }
  next()
}

//Agregar los filtros correspondientes
async function findAll(req:Request, res:Response) {
  try{
    const resenas = validarFindAll(await em.find(Resena, {}, {populate: ['pedido']}), ResenaNotFoundError)
    res.status(200).json({message: `Todas las reseñas fueron encontradas`, data: resenas})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

async function findOne(req:Request, res:Response) {
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, { nroPed: nroPed }, {failHandler: () => {throw new PedidoNotFoundError}});
    const resena = pedido.resena
    if(!resena){
      throw new ResenaNotFoundError
    }
    res.status(200).json({message: `La reseña del pedido ${nroPed} fue encontrado con éxito`, data: resena})
  } catch(error: any) {
    handleErrors(error, res)
  }
  
}

async function add(req:Request, res:Response) {
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, { nroPed }, {failHandler: () => {throw new PedidoNotFoundError}})
    req.body.sanitizedInput.pedido = pedido
    //Validamos que el pedido haya finalizado
    if(pedido.estado !== 'finalizado') {
      throw new ResenaAPedidoNoFinalizado()
    }
    //Validamos que el pedido haya finalizado

    //Validamos que el pedido no cuente ya con una reseña
    const resenaExistente = await em.findOne(Resena, { pedido })
    if(resenaExistente !== null) {
      throw new ResenaAlreadyExists()
    }
    //Validamos que el pedido no cuente ya con una reseña

    const fecha = new Date()

    /* No logramos que ZOD reconozca el tipo Date, por lo que la entidad "resena" a ser creada no pasa por esta validación
    req.body.sanitizedInput.fechaHoraResena = fecha.toISOString()
    req.body.sanitizedInput.fechaHoraModificacion = fecha.toISOString()
    */

    validarResena(req.body.sanitizedInput)

    req.body.sanitizedInput.fechaHoraResena = fecha
    req.body.sanitizedInput.fechaHoraModificacion = fecha

    const resena = em.create(Resena, req.body.sanitizedInput)
    await em.flush(),
    res.status(201).json({data: resena})
  } catch(error: any){
    handleErrors(error, res)
  }
}

async function update(req:Request, res:Response) {
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, { nroPed }, {failHandler: () => {throw new PedidoNotFoundError}})
    req.body.sanitizedInput.pedido = pedido
    const resena = await em.findOneOrFail(Resena, { pedido }, {failHandler: () => {throw new ResenaNotFoundError}})

    req.body.sanitizedInput.fechaHoraModificacion = new Date()

    let resenaUpdated
    if(req.method === 'PATCH'){
      resenaUpdated = validarResenaPatch(req.body.sanitizedInput)
    } else {
      resenaUpdated = validarResena(req.body.sanitizedInput)
    }
    em.assign(resena, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({message: `La reseña del pedido ${nroPed} fue actualizada con éxito`, data: resena})
  } catch(error: any){
    handleErrors(error, res)
  }
}

async function remove (req: Request, res: Response,) {
  try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, { nroPed }, {failHandler: () => {throw new PedidoNotFoundError}});
    const deletedResena = await em.findOneOrFail(Resena, { pedido }, {failHandler: () => {throw new ResenaNotFoundError}}) 
    await em.removeAndFlush(deletedResena)
    res.status(200).json({message: `La reseña del pedido ${nroPed} ha sido eliminada con éxito`, data: deletedResena})
  } catch(error: any){
    handleErrors(error, res)
  }
}

export {sanitizeResena, findAll, findOne, add, update, remove }