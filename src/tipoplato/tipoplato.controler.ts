import { Request, Response, NextFunction } from "express"
import { TipoPlato } from "./tipoplato.entity.js"
import { TipoPlatoRepository } from "./tipoplato.repository.js"

const repository = new TipoPlatoRepository()

function sanitizeTipoPlatoInput(req: Request, res: Response, next:NextFunction){
  req.body.satinizedInput = {
    descricion: req.body.descricion,
    id: req.body.id,
  }

  Object.keys(req.body.sanitizedInput).forEach((key)=>{
    if (req.body.sanitizedInput[key]=== undefined){
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

function findAll(req:Request,res:Response) {
  res.json({data: repository.findAll()})
}


function findOne(req:Request,res:Response) {
  const id= req.params.id
  const TipoPlato = repository.findOne({id})
  if(!TipoPlato){
    res.status(404).send({message:'TipoPlato nor found'})
  }
  res.json({data: TipoPlato})
}

function add(req:Request,res:Response) {
  const input = req.body.satinizedInput

  const tipoplatoInput = new TipoPlato (
    input.descricion, 
    input.id, 

  )

  const tipoplatos = repository.add(tipoplatoInput)
  return res.status(201).send({message: 'TipoPlato created', data: tipoplatos})
}

function update(req:Request,res:Response) {
  req.body.sanitizedInput = req.params.id
  const tipoplato = repository.update(req.body.sanitizedInput)
  if(!tipoplato){
   return  res.status(404).send({message: 'TipoPlato not found' })
  }
  return res.status(200).send({message: 'TipoPlato update successfully', data: tipoplato})
}

function remove(req:Request, res:Response) {
  const id= req.params.id
  const tipoplato =  repository.delete({id})
  if(!tipoplato){
    return res.status(404).send({message: 'TipoPlato not found'})
  } else{
  res.status(200).send({message: 'TipoPlato deleted successfully'})
  }
}



export{sanitizeTipoPlatoInput, findAll, findOne, add, update, remove}