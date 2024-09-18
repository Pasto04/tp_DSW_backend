import { Request,Response,NextFunction } from "express"
import { Pago } from "./pago.entity.js"
import { orm } from "../../shared/db/orm.js"
import { Pedido } from "../pedido.entity.js"
import { PedidoNotFoundError } from "../../shared/errors/entityErrors/pedido.errors.js"
import { PagoNotFoundError } from "../../shared/errors/entityErrors/pago.errors.js"
import { handleErrors } from "../../shared/errors/errorHandler.js"
import crypto from "node:crypto"
import { validarPago } from "./pago.schema.js"

const em = orm.em

async function sanitizePagoInput(req:Request, res:Response, next:NextFunction){
  req.body.sanitizedInput = {
    idPago: req.body.idPago,
    fechaPago: req.body.fechaPago,
    horaPago: req.body.horaPago,
    importe: req.body.importe,
    pedido: req.params.nroPed,
    tarjetaCliente: req.body.tarjetaCliente
  }

  Object.keys(req.body.sanitizedInput).forEach(key => {
    if(req.body.sanitizedInput [key] === undefined){
      delete req.body.sanitizedInput [key]
    }
  })
  next()
}

function calcularImporte(pedido: Pedido): number {
  let total = 0
  pedido.platosPedido.getItems().forEach(platoPedido => {
    total += platoPedido.plato.precio
  })
  pedido.bebidasPedido.getItems().forEach(bebidaPedido => {
    total += bebidaPedido.bebida.precio
  })
  return total
}

//Modificar el método para sólo tome el nroPed y, con eso, identifique el pago. La ruta será '/:nroPed/pago'
async function findOne(req:Request,res:Response) {
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {populate: ['pago'], failHandler: () => {throw new PedidoNotFoundError}})
    const pago = pedido.pago as Pago
    if(!pago){
      throw new PagoNotFoundError
    }
    res.status(200).json({message: `Pago del pedido ${pedido.nroPed} encontrado`, data: pago})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function add(req:Request,res:Response) {
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {populate: ['platosPedido', 'bebidasPedido'], failHandler: () => {throw new PedidoNotFoundError}})
    req.body.sanitizedInput.pedido = pedido
    req.body.sanitizedInput.idPago = crypto.randomUUID()
    let importe = calcularImporte(pedido)
    req.body.sanitizedInput.importe = importe
    const pagoValido = validarPago(req.body.sanitizedInput)
    const pago = em.create(Pago, pagoValido)
    await em.flush()
    res.status(201).json({data: pago})
  } catch (error:any){
    handleErrors(error, res)
  }
}

/* UN UPDATE DE UN PAGO ME PARECE INCORRECTO E INCLUSO PELIGROSO. NO DEBERÍA PERMITIRSE MODIFICAR UN PAGO.
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
}*/

//¿¿Tiene sentido eliminar un pago?? ¿¿Se utilizaría en casos donde hay un error durante la transacción??
async function remove (req:Request,res:Response) {
    try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {populate: ['pago'], failHandler: () => {throw new PedidoNotFoundError}})
    const pago = pedido.pago as Pago
    await em.removeAndFlush(pago)
    res.status(200).json({message: `El pago del pedido ${pedido.nroPed} ha sido eliminado con éxito`, data: pago})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

export { sanitizePagoInput, findOne, add, remove }