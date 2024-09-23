import { Request, Response, NextFunction } from "express"
import { Plato } from "./plato.entity.js"
import { orm } from "../shared/db/orm.js"
import { TipoPlato } from "./tipoPlato.entity.js"
import { Ingrediente } from "../ingrediente/ingrediente.entity.js"
import { validarIngredientesOfPlato, validarPlato, validarPlatoPatch } from "./plato.schema.js"
import { handleErrors } from "../shared/errors/errorHandler.js";
import { PlatoBadRequest, PlatoNotFoundError, PlatoPreconditionFailed, PlatoUniqueConstraintViolation } from "../shared/errors/entityErrors/plato.errors.js"
import { validarFindAll } from "../shared/validarFindAll.js"
import { TipoPlatoNotFoundError } from "../shared/errors/entityErrors/tipoPlato.errors.js"
import { IngredienteNotFoundError } from "../shared/errors/entityErrors/ingrediente.errors.js"
import { ElaboracionPlato } from "./elaboracionPlato/elaboracionPlato.entity.js"
import { Loaded } from "@mikro-orm/core"

const em = orm.em

function sanitizePlato(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    numPlato: req.body.numPlato,
    descripcion: req.body.descripcion,
    tiempo: req.body.tiempo,
    precio: req.body.precio,
    aptoCeliacos: req.body.aptoCeliacos,
    aptoVegetarianos: req.body.aptoVegetarianos,
    aptoVeganos: req.body.aptoVeganos,
    tipoPlato: req.body.tipoPlato
  }
  next()
}

function sanitizeQuery(req: Request) {
  const queryResult: any = {
    descripcion: req.query.descripcionParcial,
    tipoPlato: req.query.tipoPlato, //Asumo que me ingresan el id del tipo de plato.
    aptoCeliacos: req.query.aptoCeliacos,
    aptoVegetarianos: req.query.aptoVegetarianos,
    aptoVeganos: req.query.aptoVeganos
  }
  Object.keys(queryResult).forEach(async (keys) => {
    if(queryResult[keys] === undefined) {
      delete queryResult[keys]

    } else if(keys === 'descripcion') {
      queryResult[keys] = { $like: `%${req.query.descripcionParcial}%` }

    } else if(keys === 'tipoPlato') {
      queryResult[keys] = await em.findOneOrFail(TipoPlato, {numPlato: Number.parseInt(req.query.tipoPlato as string)}, {failHandler: () => {throw new TipoPlatoNotFoundError}})
      //console.log(queryResult[keys])

    } else if(queryResult[keys] === 'true') {
      queryResult[keys] = !!queryResult[keys]

    } else {
      queryResult[keys] = !!!queryResult[keys]
    }
  })
  console.log(queryResult)
  return queryResult
}

//Incorporar manejo del req.query para filtrar por tipo de plato, ingrediente, aptoPara[x], etc.
async function findAll(req:Request,res:Response) {
  try{
    req.query.sanitizedQuery = sanitizeQuery(req)
    const platos = validarFindAll(await em.find(Plato, req.query.sanitizedQuery as object, {populate:['tipoPlato']}), PlatoNotFoundError)
    res.status (200).json({message: 'Todos los platos encontrados', data: platos})
  } catch (error:any){
    handleErrors(error, res)
  }
}

async function findOne(req:Request,res:Response) {
  try{
    const numPlato = Number.parseInt(req.params.numPlato)
    const plato = await em.findOneOrFail(Plato, {numPlato}, {populate: ['tipoPlato'], failHandler: () => {throw new PlatoNotFoundError}})
    res.status(200).json({message: 'Plato encontrado', data: plato})
  } catch (error:any){
    handleErrors(error, res)
  }
}


// Validamos si el plato es apto para celíacos basado en los ingredientes que lo componen
function isAptoCeliacos(ingredientes: {ingrediente: Ingrediente, cantidadNecesaria: number}[]): boolean {
  let result: boolean | undefined
  for(let i = 0; i < ingredientes.length; i++) {
    if(!ingredientes[i].ingrediente.aptoCeliacos) {
      result = false
      i = ingredientes.length
    } 
  }
  if(result === undefined) {
    result = true
  }
  return result 
}

// Validamos si el plato es apto para vegetarianos basado en los ingredientes que lo componen
function isAptoVegetarianos(ingredientes: {ingrediente: Ingrediente, cantidadNecesaria: number}[]): boolean {
  let result: boolean | undefined
  for(let i = 0; i < ingredientes.length; i++) {
    if(!ingredientes[i].ingrediente.aptoVegetarianos) {
      result = false
      i = ingredientes.length
    } 
  }
  if(result === undefined) {
    result = true
  }
  return result 
}

// Validamos si el plato es apto para veganos basado en los ingredientes que lo componen
function isAptoVeganos(ingredientes: {ingrediente: Ingrediente, cantidadNecesaria: number}[]): boolean {
  let result: boolean | undefined
  for(let i = 0; i < ingredientes.length; i++) {
    if(!ingredientes[i].ingrediente.aptoVeganos) {
      result = false
      i = ingredientes.length
    } 
  }
  if(result === undefined) {
    result = true
  }
  return result 
}


async function add(req:Request,res:Response) {
  try{
    if((await em.find(TipoPlato, {})).length === 0 || (await em.find(Ingrediente, {})).length === 0) {
      throw new PlatoPreconditionFailed
    } else if(req.body.ingredientes === undefined || req.body.ingredientes.length === 0) {
      throw new PlatoBadRequest
    } else {

      // Validamos que los ingredientes ingresados y sus cantidades sean correctos
      let ingredientes: {ingrediente: Ingrediente, cantidadNecesaria: number}[] = []
      await Promise.all(req.body.ingredientes.map(async (ingreCant: {ingrediente: number, cantidadNecesaria: number}) => {
        const ingre = await em.findOneOrFail(Ingrediente, {codigo: ingreCant.ingrediente}, {failHandler: () => {throw new IngredienteNotFoundError}})
        ingredientes.push({ingrediente: ingre, cantidadNecesaria: ingreCant.cantidadNecesaria})
      }))
      const ingredientesValidos = validarIngredientesOfPlato(ingredientes)
      // Validamos que los ingredientes ingresados y sus cantidades sean correctos

      //Asignamos aptitud para celíacos, veganos y vegetarianos según los ingredientes ingresados
      req.body.sanitizedInput.aptoCeliacos = isAptoCeliacos(ingredientesValidos)
      req.body.sanitizedInput.aptoVegetarianos = isAptoVegetarianos(ingredientesValidos)
      req.body.sanitizedInput.aptoVeganos = isAptoVeganos(ingredientesValidos)
      //Asignamos aptitud para celíacos, veganos y vegetarianos según los ingredientes ingresados

      // Validamos el plato y lo creamos junto con las elaboracionesPlato necesarias
      req.body.sanitizedInput.tipoPlato = (await em.findOneOrFail(TipoPlato, {numPlato: req.body.sanitizedInput.tipoPlato}, {failHandler: () => {throw new TipoPlatoNotFoundError}})) as TipoPlato
      const platoValido = validarPlato(req.body.sanitizedInput)
      const plato = em.create(Plato, platoValido)
      await Promise.all(ingredientesValidos.map(async (ingreCant: {ingrediente: Ingrediente, cantidadNecesaria: number}) => {
        const elabPlato = em.create(ElaboracionPlato, {plato, ingrediente: ingreCant.ingrediente, cantidadNecesaria: ingreCant.cantidadNecesaria})
        await em.persistAndFlush(elabPlato)
      }))
      await em.persistAndFlush(plato)
      res.status(201).json({message: 'Plato creado', data: plato})
    }
    } catch (error:any){
      if (error.name === 'UniqueConstraintViolationException') {
        error = new PlatoUniqueConstraintViolation
      }
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
    if (error.name === 'UniqueConstraintViolationException') {
      error = new PlatoUniqueConstraintViolation
    }
    handleErrors(error, res)
  }
}

async function remove(req:Request, res:Response) {
    try {
    const numPlato = Number.parseInt(req.params.numPlato)
    const plato = await em.findOneOrFail(Plato, {numPlato}, {failHandler: () => {throw new PlatoNotFoundError}})
    const elaboracionesPlato = await em.find(ElaboracionPlato, {plato})
    elaboracionesPlato.map(async (elabPlato) => {
      await em.removeAndFlush(elabPlato)
    })
    await em.removeAndFlush(plato)
    res.status(200).json({message: 'El plato ha sido eliminado con éxito', data: plato})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

export{findAll, findOne, add, sanitizePlato, update, remove}