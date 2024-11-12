import { Request,Response,NextFunction } from "express"
import { Pago } from "./pago.entity.js"
import { orm } from "../../shared/db/orm.js"
import { Pedido } from "../pedido.entity.js"
import { PedidoNotFoundError } from "../../shared/errors/entityErrors/pedido.errors.js"
import { PagoNotFoundError, PagoPreconditionFailed } from "../../shared/errors/entityErrors/pago.errors.js"
import { handleErrors } from "../../shared/errors/errorHandler.js"
import crypto from "node:crypto"
import { validarPago } from "./pago.schema.js"
import { TarjetaCliente } from "../../tarjetaCliente/tarjetaCliente.entity.js"
import { TarjetaClienteNotFoundError } from "../../shared/errors/entityErrors/tarjetaCliente.errors.js"

const em = orm.em

async function sanitizePagoInput(req:Request, res:Response, next:NextFunction){
  req.body.sanitizedInput = {
    pedido: req.params.nroPed,
    idPago: req.body.idPago,
    fechaPago: req.body.fechaPago,
    horaPago: req.body.horaPago,
    importe: req.body.importe,
    tarjetaCliente: req.body.tarjetaCliente
  }

  /*Object.keys(req.body.sanitizedInput).forEach(key => {
    if(req.body.sanitizedInput [key] === undefined){
      delete req.body.sanitizedInput [key]
    }
  })*/
  next()
}

//Modificar el método para sólo tome el nroPed y, con eso, identifique el pago. La ruta será '/:nroPed/pago'
async function findOne(req:Request,res:Response) {
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {populate: ['pago'], failHandler: () => {throw new PedidoNotFoundError}})
    const pago = await em.findOneOrFail(Pago, {pedido}, {failHandler: () => {throw new PagoNotFoundError}})
    res.status(200).json({message: `Pago del pedido ${pedido.nroPed} encontrado`, data: pago})
  } catch (error:any){
    handleErrors(error, res)
  }
}


function validarEntregaDeElementos(pedido: Pedido): void {
  pedido.platosPedido.getItems().forEach((platoPedido) => {
    if(platoPedido.entregado === false) {
      throw new PagoPreconditionFailed
    }
  })
}

// RECORDAR HACER BIEN EL POPULATE DE LA ENTIDAD PEDIDO PARA QUE MUESTRE CORRECTAMENTE LOS PRECIOS
function calcularImporte(pedido: Pedido, totalPlatos: number = 0, totalBebidas: number = 0): number {
  pedido.platosPedido.getItems().map(platoPedido => {
    totalPlatos +=  platoPedido.plato.precio * platoPedido.cantidad
  })
  pedido.bebidasPedido.getItems().map(bebidaPedido => {
    totalBebidas += bebidaPedido.bebida.precio * bebidaPedido.cantidad
  })
  return totalPlatos + totalBebidas
}


async function add(req:Request,res:Response) {
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, {nroPed}, {populate: ['platosPedido.plato', 'bebidasPedido.bebida'], failHandler: () => {throw new PedidoNotFoundError}})
    validarEntregaDeElementos(pedido) // Si bien considero que no es correcto, el pago no se podrá realizar hasta que todos los productos hayan sido entregados.
    req.body.sanitizedInput.pedido = await em.findOneOrFail(Pedido, {nroPed}, {failHandler: () => {throw new PedidoNotFoundError}})
    req.body.sanitizedInput.idPago = crypto.randomUUID()
    req.body.sanitizedInput.importe = calcularImporte(pedido)
    req.body.sanitizedInput.tarjetaCliente = await em.findOneOrFail(TarjetaCliente, {idTarjeta: req.body.tarjetaCliente}, {failHandler: () => {throw new TarjetaClienteNotFoundError}})
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