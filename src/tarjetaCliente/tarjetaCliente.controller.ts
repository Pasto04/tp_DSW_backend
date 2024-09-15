
import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Usuario } from "../usuario/usuario.entity.js"
import { TarjetaCliente } from "./tarjetaCliente.entity.js"

const em = orm.em

function sanitizeTarjetaClienteInput(req: Request, res: Response, next:NextFunction){
  req.body.sanitizedInput = {
    idTarjeta: req.body.idTarjeta,
    nroTarjeta: req.body.nroTarjeta,
    tipoTarjeta: req.body.tipoTarjeta,
    bancoTarjeta: req.body.bancoTarjeta,
    titular: req.body.titular,
    vencimiento: req.body.vencimiento,
    codSeguridad: req.body.codSeguridad,
    tarjeta: req.body.tarjeta,
    cliente: req.params.id
  }

  Object.keys(req.body.sanitizedInput).forEach((key)=>{
    if (req.body.sanitizedInput[key]=== undefined){
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

async function findAll(req:Request,res:Response) {
  try{
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Usuario, {id})
    const tarjetasUsuario = await em.find(TarjetaCliente, {cliente}, {populate: ['tarjeta', 'cliente']})
    res.status (200).json({message: 'Todos las tarjetas encontradas', data: tarjetasUsuario})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function findOne(req:Request,res:Response) {
  try{
    const idTarjeta = Number.parseInt(req.params.idTarjeta)
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Usuario, {id})
    const tarjetaClientes = await em.findOneOrFail(TarjetaCliente, {idTarjeta, cliente}, {populate: ['tarjeta', 'cliente']})
    res.status(200).json({message: 'Tarjeta encontrada', data: tarjetaClientes})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function add(req:Request,res:Response) {
  try{
    const tarjetaCliente = em.create(TarjetaCliente, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({message: 'Tarjeta creada/agregada', data: tarjetaCliente})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function update(req:Request,res:Response) {
  try{
    const idTarjeta = Number.parseInt(req.params.idTarjeta)
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Usuario, {id})
    const tarjetaCliente = await em.findOneOrFail(TarjetaCliente, {idTarjeta, cliente})
    em.assign(tarjetaCliente, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({message: 'La tarjeta ha sido actualizada exitosamente', data: tarjetaCliente})
  } catch (error:any){
    res.status(500).json({message:error.message})
  }
}

async function remove(req:Request, res:Response) {
    try {
    const idTarjeta = Number.parseInt(req.params.idTarjeta)
    const id = Number.parseInt(req.params.id)
    const cliente = await em.findOneOrFail(Usuario, {id})
    const tarjetaCliente = await em.findOneOrFail(TarjetaCliente, {idTarjeta, cliente})
    em.removeAndFlush(tarjetaCliente)
    res.status(200).json({message: 'El plato ha sido eliminado con éxito', data: tarjetaCliente})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

export{sanitizeTarjetaClienteInput, findAll, findOne, add, update, remove}