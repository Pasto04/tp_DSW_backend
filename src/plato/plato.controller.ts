import { Request, Response, NextFunction } from "express"
import { Plato } from "./plato.entity.js"
import { orm } from "../shared/db/orm.js"
import { TipoPlato } from "./tipoPlato.entity.js"
import { Ingrediente } from "../ingrediente/ingrediente.entity.js"
import z from 'zod'
import { validarPlato, validarPlatoPatch } from "./plato.schema.js"

const em = orm.em

function handleErrors(error: any, res: Response) {
  if(error instanceof z.ZodError) {
    res.status(400).json({message: JSON.parse(error.message)[0].message})
  } else if (error.name === 'NotFoundError') {
    res.status(404).json({message: 'El plato no fue encontrado'})
  } else if (error.name === 'UniqueConstraintViolationException') {
    res.status(400).json({message: 'El plato ya existe'})
  } else {
    res.status(500).json({message: error.message})
  }
}

async function findAll(req:Request,res:Response) {
  try{
    const platos = await em.find(Plato, {}, {populate:['tipoPlato']})
    res.status (200).json({message: 'Todos los platos encontrados', data: platos})
  } catch (error:any){
    handleErrors(error, res)
  }
}


async function findOne(req:Request,res:Response) {
  try{
    const numPlato = Number.parseInt(req.params.numPlato)
    const plato = await em.findOneOrFail(Plato, {numPlato}, {populate: ['tipoPlato']})
    res.status(200).json({message: 'Plato encontrado', data: plato})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function add(req:Request,res:Response) {
  try{
    if((await em.find(TipoPlato, {})).length === 0) {
      res.status(409).json({message: `No es posible cargar un plato sin un tipo de plato registrado`})
    } else if ((await em.find(Ingrediente, {})).length === 0) {
      res.status(409).json({message: `No es posible cargar un plato sin un ingrediente registrado`})
    } else {
      const platoValido = validarPlato(req.body)
      const plato = em.create(Plato, platoValido)
      await em.flush()
      res.status(201).json({message: 'Plato creado', data:plato})
    }
    } catch (error:any){
    handleErrors(error, res)
  }
}

async function update(req:Request,res:Response) {
  try{
    const numPlato = Number.parseInt(req.params.numPlato)
    const platoToUpdate = await em.findOneOrFail(Plato, {numPlato})
    let platoUpdated
    if(req.method === 'PATCH') {
      platoUpdated = validarPlatoPatch(req.body)
    } else {
      platoUpdated = validarPlato(req.body)
    }
    em.assign(platoToUpdate, platoUpdated)
    await em.flush()
    res.status(200).json({message: 'El plato ha sido actualizado exitosamente', data: platoToUpdate})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function remove(req:Request, res:Response) {
    try {
    const numPlato = Number.parseInt(req.params.numPlato)
    const plato = await em.findOneOrFail(Plato, {numPlato})
    em.removeAndFlush(plato)
    res.status(200).json({message: 'El plato ha sido eliminado con éxito', data: plato})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

export{findAll, findOne, add, update, remove}