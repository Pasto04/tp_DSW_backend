import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/db/orm.js";
import { Bebida } from "../bebida/bebida.entity.js";
import { BebidaDeProveedor } from "./bebidaDeProveedor.entity.js";
import { Proveedor } from "../proveedor/proveedor.entity.js";

const em = orm.em

function sanitizeBebidaDeProveedor(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedBebidaDeProveedor = {
    bebida: req.params.codBebida,
    proveedor: req.body.proveedor
  }

  Object.keys(req.body.sanitizedBebidaDeProveedor).forEach((keys) => {
    if (req.body.sanitizedBebidaDeProveedor[keys] === undefined) {
      delete req.body.sanitizedBebidaDeProveedor[keys]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const codBebida = Number.parseInt(req.params.cod)
    const bebida = await em.findOneOrFail(Bebida, {codBebida})
    const bebidasDeProv = await em.find(BebidaDeProveedor, {bebida}, {populate: ['bebida', 'proveedor']})
    res.status(200).json({message: `Los proveedores de la bebida "${bebida.descripcion}" han sido encontrados con éxito`, data: bebidasDeProv})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const codBebida = Number.parseInt(req.params.cod)
    const id = Number.parseInt(req.params.id)
    const bebida = await em.findOneOrFail(Bebida, {codBebida})
    const proveedor = await em.findOneOrFail(Proveedor, {id})
    const bebidaDeProv = await em.findOneOrFail(BebidaDeProveedor, {bebida, proveedor}, {populate: ['bebida', 'proveedor']})
    res.status(200).json({message: `El proveedor de cuit "${proveedor.cuit}" de la bebida "${bebida.descripcion}" ha sido encontrado con éxito`, data: bebidaDeProv})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function add(req: Request, res: Response) {
  try {
    const bebidaDeProv = em.create(BebidaDeProveedor, req.body.sanitizedBebidaDeProveedor)
    await em.flush()
    res.status(201).json({data: bebidaDeProv})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function update(req: Request, res: Response) {
  try {
    const codBebida = Number.parseInt(req.params.cod)
    const id = Number.parseInt(req.params.id)
    const bebida = await em.findOneOrFail(Bebida, {codBebida})
    const proveedor = await em.findOneOrFail(Proveedor, {id})
    const bebidaDeProv = await em.findOneOrFail(BebidaDeProveedor, {bebida, proveedor})
    em.assign(bebidaDeProv, req.body.sanitizedBebidaDeProveedor)
    await em.flush()
    res.status(200).json({message: `El proveedor de cuit "${proveedor.cuit}" de la bebida "${bebida.descripcion}" ha sido actualizado con éxito`, data: bebidaDeProv})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

async function remove(req: Request, res: Response) {
  try {
    const codBebida = Number.parseInt(req.params.cod)
    const id = Number.parseInt(req.params.id)
    const bebida = await em.findOneOrFail(Bebida, {codBebida})
    const proveedor = await em.findOneOrFail(Proveedor, {id})
    const bebidaDeProv = await em.findOneOrFail(BebidaDeProveedor, {bebida, proveedor})
    await em.removeAndFlush(bebidaDeProv)
    res.status(200).json({message: `El proveedor de cuit "${proveedor.cuit}" de la bebida "${bebida.descripcion}" ha sido eliminado con éxito`, data: bebidaDeProv})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

export { sanitizeBebidaDeProveedor, findAll, findOne, add, update, remove }