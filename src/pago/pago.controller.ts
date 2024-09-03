import { Request,Response,NextFunction } from "express"
import { Pago } from "./pago.entity.js"
import { orm } from "../shared/db/orm.js"

const em = orm.em

async function sanitizePagoInput(req:Request, res:Response, next:NextFunction){
  req.body.sanitizedInput = {
    idPago: req.body.idPago,
    fecha: req.body.fehcaPago,
    horaPago: req.body.horaPago,
    importe: req.body.importe
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
    const pagos = await em.find(Pago, {})
    res.status (200).json({message: 'Todos los pagos encontrados', data: pagos})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function findOne(req:Request,res:Response) {
  try{
    const idPago = Number.parseInt(req.params.idPago)
    const pago = await em.findOneOrFail(Pago, {idPago},)
    res.status(200).json({message: 'Pago encontrado', data: pago})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function add(req:Request,res:Response) {
  try{
    const pago = em.create(Pago, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({message: 'Mesa creado', data:pago})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function update (req:Request,res:Response){
  try{
    const idPago = Number.parseInt(req.params.idPago)
    const pagoToUpdate = await em.findOneOrFail(Pago, {idPago})
    em.assign(pagoToUpdate, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({message: 'Pago actualizado', data: pagoToUpdate})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function remove (req:Request,res:Response) {
    try {
    const idPago = Number.parseInt(req.params.idPago)
    const pago = await em.findOneOrFail(Pago, {idPago})
    em.removeAndFlush(pago)
    res.status(200).json({message: 'El pago ha sido eliminado con éxito', data: pago})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

export {sanitizePagoInput,findAll,findOne,add,update,remove}