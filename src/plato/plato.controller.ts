import { Request, Response, NextFunction } from "express"
import { Plato } from "./plato.entity.js"
import { orm } from "../shared/db/orm.js"
import { TipoPlato } from "./tipoPlato.entity.js"
import { Ingrediente } from "../ingrediente/ingrediente.entity.js"
import { validarPlato, validarPlatoPatch } from "./plato.schema.js"
import { handleErrors } from "../shared/errors/errorHandler.js";
import { PlatoNotFoundError, PlatoPreconditionFailed } from "../shared/errors/entityErrors/plato.errors.js"

const em = orm.em

function sanitizePlato(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizeInput = {
    numPlato: req.body.numPlato,
    descripcion: req.body.descripcion,
    tiempo: req.body.tiempo,
    precio: req.body.precio,
    aptoCeliacos: req.body.aptoCeliacos,
    aptoVegetarianos: req.body.aptoVegetarianos,
    aptoVeganos: req.body.aptoVeganos,
    tipoPlato: req.body.tipoPlato
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

//Incorporar manejo del req.query para filtrar por tipo de plato, ingrediente, aptoPara[x], etc.
async function findOne(req:Request,res:Response) {
  try{
    const numPlato = Number.parseInt(req.params.numPlato)
    const plato = await em.findOneOrFail(Plato, {numPlato}, {populate: ['tipoPlato'], failHandler: () => {throw new PlatoNotFoundError}})
    res.status(200).json({message: 'Plato encontrado', data: plato})
  } catch (error:any){
    handleErrors(error, res)
  }
}

//Me interesa obtener si el plato es apto para celíacos, veganos y vegetarianos a partir de sus ingredientes.
async function add(req:Request,res:Response) {
  try{
    if((await em.find(TipoPlato, {})).length === 0 || (await em.find(Ingrediente, {})).length === 0) {
      throw new PlatoPreconditionFailed
    } else {
      const platoValido = validarPlato(req.body.sanitizedInput)
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
    const platoToUpdate = await em.findOneOrFail(Plato, {numPlato}, {failHandler: () => {throw new PlatoNotFoundError}})
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
    const plato = await em.findOneOrFail(Plato, {numPlato}, {failHandler: () => {throw new PlatoNotFoundError}})
    em.removeAndFlush(plato)
    res.status(200).json({message: 'El plato ha sido eliminado con éxito', data: plato})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

export{findAll, findOne, add, update, remove}