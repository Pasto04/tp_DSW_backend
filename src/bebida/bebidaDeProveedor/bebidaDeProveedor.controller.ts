import { Request, Response } from "express";
import { orm } from "../../shared/db/orm.js";
import { Bebida } from "../bebida.entity.js";
import { BebidaDeProveedor } from "./bebidaDeProveedor.entity.js";
import { Proveedor } from "../../proveedor/proveedor.entity.js";
import { validarBebidaDeProveedor } from "./bebidaDeProveedor.schema.js";
import { handleErrors } from "../../shared/errors/errorHandler.js";

const em = orm.em

async function findAll(req: Request, res: Response) {
  try {
    const codBebida = Number.parseInt(req.params.cod)
    const bebida = await em.findOneOrFail(Bebida, {codBebida})
    const bebidasDeProv = await em.find(BebidaDeProveedor, {bebida}, {populate: ['bebida', 'proveedor']})
    res.status(200).json({message: `Los proveedores de la bebida "${bebida.descripcion}" han sido encontrados con éxito`, data: bebidasDeProv})
  } catch (error: any) {
    handleErrors(error, res)
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
    handleErrors(error, res)
  }
}

async function add(req: Request, res: Response) {
  try {
    const bebidaDeProvValida = validarBebidaDeProveedor(req.body)
    const bebidaDeProv = em.create(BebidaDeProveedor, bebidaDeProvValida)
    await em.flush()
    res.status(201).json({data: bebidaDeProv})
  } catch (error: any) {
    handleErrors(error, res)
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
    handleErrors(error, res)
  }
}

export { findAll, findOne, add, /*update,*/ remove }