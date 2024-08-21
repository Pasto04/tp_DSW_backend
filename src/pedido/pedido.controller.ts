import { Request,Response,NextFunction } from "express"
import { Pedido } from "./pedido.entity.js"
import { orm } from "../shared/db/orm.js"

const em = orm.em

async function sanitizePedidoInput(req:Request, res:Response, next:NextFunction){
  req.body.sanitizedInput = {
    nroPed: req.body.nroPed,
    estado: req.body.estado,
    hora: req.body.hora,
    fecha: req.body.fecha,
    fechaCancelacion: req.body.fechaCancelacion,
    horaCancelacion: req.body.horaCancelacion,
    reseña: req.body.reseña,
    cliente: req.body.cliente,
    nroMesa: req.body.nroMesa
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
    const pedidos = await em.find(Pedido, {}, {populate: ['cliente']})
    res.status (200).json({message: 'Todos los pedidos encontrados', data: pedidos})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function findOne(req:Request,res:Response) {
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed},)
    res.status(200).json({message: 'Pedido encontrado', data: pedido})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function add(req:Request,res:Response) {
  try{
    const pedido = em.create(Pedido, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({message: 'Pedido creado', data:pedido})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function update (req:Request,res:Response){
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedidoToUpdate = await em.findOneOrFail(Pedido, {nroPed})
    em.assign(pedidoToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({message: 'Pedido actualizado', data: pedidoToUpdate})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function remove (req:Request,res:Response) {
    try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed})
    em.removeAndFlush(pedido)
    res.status(200).json({message: 'El pedido ha sido eliminado con éxito', data: pedido})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

export {sanitizePedidoInput,findAll,findOne,add,update,remove}