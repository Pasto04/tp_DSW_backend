import { Request, Response, NextFunction } from 'express'
import { orm } from '../shared/db/orm.js'
import { Proveedor } from './proveedor.entity.js'
import { validarProveedor, validarProveedorPatch } from './proveedor.schema.js'
import { handleErrors } from '../shared/errors/errorHandler.js'
import { ProveedorNotFoundError } from '../shared/errors/entityErrors/proveedor.errors.js'
import { validarFindAll } from '../shared/validarFindAll.js'

const em = orm.em

em.getRepository(Proveedor)

// Como uso Zod, no requiero esta función, pero la conservo para tenerla en cuenta en el futuro 
/*function validarRequest(req: {id?: number, razonSocial?: string, cuit?: string, direccion?: string, telefono?: string, email?: string}) {
  if (req.id !== undefined && typeof req.id !== 'number') {
    const newError = new Error('id debe ser number')
    throw newError
  } else if (req.razonSocial !== undefined && typeof req.razonSocial !== 'string') {
    const newError = new Error('razonSocial debe ser string')
    console.log(newError)
    throw newError
  } else if (req.cuit !== undefined && typeof req.cuit !== 'string') {
    const newError = new Error('cuit debe ser string')
    throw newError
  } else if (req.direccion !== undefined && typeof req.direccion !== 'string') {
    const newError = new Error('direccion debe ser string')
    throw newError
  } else if (req.telefono !== undefined && typeof req.telefono !== 'string') {
    const newError = new Error('telefono debe ser string')
    throw newError
  } else if (req.email !== undefined && typeof req.email !== 'string') {
    const newError = new Error('email debe ser string')
    throw newError
  }
  return 
}*/

async function findAll(req: Request, res: Response) {
  try {
    const proveedores = validarFindAll(await em.find(Proveedor, {}), ProveedorNotFoundError)
    res.status(200).json({message: `Los proveedores han sido encontrados con éxito`, data: proveedores})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const proveedor = await em.findOneOrFail(Proveedor, {id}, {failHandler: () => {throw new ProveedorNotFoundError}})
    res.status(200).json({message: `El proveedor ${proveedor.razonSocial} ha sido encontrado con éxito`, data: proveedor})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

async function add(req: Request, res: Response) {
  try {
    const result = validarProveedor(req.body)
    const proveedor = em.create(Proveedor, result)
    await em.flush()
    res.status(201).json({data: proveedor})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const proveedor = await em.findOneOrFail(Proveedor, {id}, {failHandler: () => {throw new ProveedorNotFoundError}})
    let proveedorUpdated
    if (req.method === 'PATCH') {
      proveedorUpdated = validarProveedorPatch(req.body)
    } else {
      proveedorUpdated = validarProveedor(req.body)
    }
    em.assign(proveedor, proveedorUpdated)
    await em.flush()
    res.status(200).json({message: `El proveedor ${proveedor.razonSocial} ha sido actualizado con éxito`, data: proveedor})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const proveedor = await em.findOneOrFail(Proveedor, {id}, {failHandler: () => {throw new ProveedorNotFoundError}})
    await em.removeAndFlush(proveedor)
    res.status(200).json({message: `El proveedor ${proveedor.razonSocial} ha sido eliminado con éxito`, data: proveedor})
  } catch(error: any) {
    handleErrors(error, res)
  }
}

export { findAll, findOne, add, update, remove }