import { Request,Response,NextFunction } from "express"
import { Pago } from "./pago.entity.js"
import { orm } from "../../shared/db/orm.js"
import { Usuario } from "../../usuario/usuario.entity.js"
import { Pedido } from "../pedido.entity.js"

const em = orm.em

async function sanitizePagoInput(req:Request, res:Response, next:NextFunction){
  req.body.sanitizedInput = {
    idPago: req.body.idPago,
    fechaPago: req.body.fechaPago.split('T')[0],
    horaPago: req.body.horaPago,
    importe: req.body.importe,
    pedido: req.params.nroPed,
    tarjetaUsuario: req.body.tarjetaUsuario
  }

  Object.keys(req.body.sanitizedInput).forEach(key => {
    if(req.body.sanitizedInput [key] === undefined){
      delete req.body.sanitizedInput [key]
    }
  })
  next()
}

async function findOne(req:Request,res:Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Usuario, {id})
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed, cliente}, {populate: ['cliente', 'mesa']})
    const pago = await em.findOneOrFail(Pago, {pedido}, {populate: ['tarjetaCliente', 'pedido']})
    res.status(200).json({message: `Pago del pedido ${pedido.nroPed} del cliente ${cliente.nombre} ${cliente.apellido} encontrado`, data: pago})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function add(req:Request,res:Response) {
  try{
    const pago = em.create(Pago, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({data: pago})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function update (req:Request,res:Response){
  try{
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Usuario, {id})
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed, cliente})
    const pago = await em.findOneOrFail(Pago, {pedido})
    em.assign(pago, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({message: `Pago del pedido ${pedido.nroPed} del cliente ${cliente.nombre} ${cliente.apellido} actualizado con éxito`, data: pago})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function remove (req:Request,res:Response) {
    try {
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Usuario, {id})
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed, cliente})
    const pago = await em.findOneOrFail(Pago, {pedido})
    await em.removeAndFlush(pago)
    res.status(200).json({message: `El pago del pedido ${pedido.nroPed} del cliente ${cliente.nombre} ${cliente.apellido} ha sido eliminado con éxito`, data: pago})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

export { sanitizePagoInput, findOne, add, update, remove }