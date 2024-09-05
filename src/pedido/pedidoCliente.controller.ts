import { Request,Response,NextFunction } from "express"
import { Pedido } from "./pedido.entity.js"
import { orm } from "../shared/db/orm.js"
import { Cliente } from "../cliente/cliente.entity.js"

const em = orm.em

async function sanitizePedidoClienteInput(req:Request, res:Response, next:NextFunction){
  req.body.sanitizedPedCliInput = {
    nroPed: req.body.nroPed,
    estado: req.body.estado,
    hora: req.body.hora,
    fecha: req.body.fecha,
    fechaCancelacion: req.body.fechaCancelacion,
    horaCancelacion: req.body.horaCancelacion,
    reseña: req.body.reseña,
    cliente: req.params.id,
    mesa: req.body.mesa
  }

  Object.keys(req.body.sanitizedPedCliInput).forEach(key => {
    if(req.body.sanitizedPedCliInput [key] === undefined){
      delete req.body.sanitizedPedCliInput [key]
    }
  })
  next()
}

async function findAll(req:Request,res:Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Cliente, {id})
    const pedidos = await em.find(Pedido, {cliente}, {populate: ['cliente']})
    res.status (200).json({message: `Todos los pedidos del cliente ${cliente.nombre} ${cliente.apellido} encontrados con éxito`, data: pedidos})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function findOne(req:Request,res:Response) {
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Cliente, {id}) 
    const pedido = await em.findOneOrFail(Pedido, {nroPed, cliente}, {populate: ['cliente']})
    res.status(200).json({message: `Pedido ${nroPed} del cliente ${cliente.nombre} ${cliente.apellido} encontrado`, data: pedido})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function add(req:Request,res:Response) {
  try{
    const pedido = em.create(Pedido, req.body.sanitizedPedCliInput)
    await em.flush()
    res.status(201).json({data:pedido})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function update (req:Request,res:Response){
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Cliente, {id})
    const pedidoToUpdate = await em.findOneOrFail(Pedido, {nroPed, cliente})
    em.assign(pedidoToUpdate, req.body.sanitizedPedCliInput)
    em.flush()
    res.status(200).json({message: `Pedido ${nroPed} del cliente ${cliente.nombre} ${cliente.apellido} ha sido actualizado`, data: pedidoToUpdate})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function remove (req:Request,res:Response) {
    try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Cliente, {id})
    const pedido = await em.findOneOrFail(Pedido, {nroPed, cliente})
    em.removeAndFlush(pedido)
    res.status(200).json({message: `El pedido ${nroPed} del cliente ${cliente.nombre} ${cliente.apellido} ha sido eliminado con éxito`, data: pedido})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

export {sanitizePedidoClienteInput, findAll, findOne, add, update, remove}