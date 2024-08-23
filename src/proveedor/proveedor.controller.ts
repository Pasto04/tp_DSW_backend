import { Request, Response, NextFunction } from 'express'
import { orm } from '../shared/db/orm.js'
import { Proveedor } from './proveedor.entity.js'

const em = orm.em

em.getRepository(Proveedor)

async function findAll(req: Request, res: Response) {
  try {
    const proveedores = await em.find(Proveedor, {})
    res.status(200).json({message: `Los proveedores han sido encontrados con éxito`, data: proveedores})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const proveedor = await em.findOneOrFail(Proveedor, {id})
    res.status(200).json({message: `El proveedor ${proveedor.razonSocial} ha sido encontrado con éxito`, data: proveedor})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

async function add(req: Request, res: Response) {
  try {
    const proveedor = em.create(Proveedor, req.body)
    await em.flush()
    res.status(201).json({data: proveedor})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const proveedor = await em.findOneOrFail(Proveedor, {id})
    em.assign(proveedor, req.body)
    await em.flush()
    res.status(200).json({message: `El proveedor ${proveedor.razonSocial} ha sido actualizado con éxito`, data: proveedor})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const proveedor = await em.findOneOrFail(Proveedor, {id})
    await em.removeAndFlush(proveedor)
    res.status(200).json({message: `El proveedor ${proveedor.razonSocial} ha sido eliminado con éxito`, data: proveedor})
  } catch(error: any) {
    res.status(500).json({message: error.message})
  }
}

export { findAll, findOne, add, update, remove }