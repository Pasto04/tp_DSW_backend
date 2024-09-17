import { Request, Response, NextFunction } from "express";
import { orm } from "../../shared/db/orm.js";
import { Bebida } from "../bebida.entity.js";
import { BebidaDeProveedor } from "./bebidaDeProveedor.entity.js";
import { Proveedor } from "../../proveedor/proveedor.entity.js";
import z from 'zod'
import { validarBebidaDeProveedor } from "./bebidaDeProveedor.schema.js";

const em = orm.em

function handleErrors(error: any, res: Response) {
  if(error instanceof z.ZodError) {
    res.status(400).json({message: JSON.parse(error.message)[0].message})
  } else if (error.name === 'NotFoundError') {
    res.status(404).json({message: 'El proveedor de la bebida no ha sido encontrado'})
  } else {
    res.status(500).json({message: error.message})
  }
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
    const bebidaDeProvValida = validarBebidaDeProveedor(req.body)
    const bebidaDeProv = em.create(BebidaDeProveedor, bebidaDeProvValida)
    await em.flush()
    res.status(201).json({data: bebidaDeProv})
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

/* NO TIENE SENTIDO DEFINIR UN UPDATE PARA ESTA ENTIDAD. SÓLO SERÁ CREADA Y ELIMINADA
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
}*/

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

export { findAll, findOne, add, /*update,*/ remove }