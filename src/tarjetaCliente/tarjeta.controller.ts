import { Request, Response } from 'express';
import { Tarjeta } from './tarjeta.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

// Obtener todas las tarjetas
async function findAll(req: Request, res: Response) {
  try {
    const tarjetas = await em.find(Tarjeta, {});
    res.status(200).json({ message: 'Todas las tarjetas fueron encontradas', data: tarjetas });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// Obtener una tarjeta por su ID
async function findOne(req: Request, res: Response) {
  try {
    const nroTarjeta = Number.parseInt(req.params.nroTarjeta)
    const tarjeta = await em.findOneOrFail(Tarjeta, { nroTarjeta });
    res.status(200).json({ message: 'La tarjeta fue encontrada con éxito', data: tarjeta });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// Crear una nueva tarjeta
async function add(req: Request, res: Response) {
  try {
    const tarjeta = em.create(Tarjeta, req.body);
    await em.flush();
    res.status(201).json({ message: 'La tarjeta fue creada con éxito', data: tarjeta });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// Actualizar una tarjeta existente
async function update(req: Request, res: Response) {
  try {
    const nroTarjeta = Number.parseInt(req.params.nroTarjeta)
    const tarjeta = await em.findOneOrFail(Tarjeta, { nroTarjeta });
    em.assign(tarjeta, req.body);
    await em.flush();
    res.status(200).json({ message: 'La tarjeta fue actualizada con éxito', data: tarjeta });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// Eliminar una tarjeta
async function remove(req: Request, res: Response) {
  try {
    const nroTarjeta = Number.parseInt(req.params.nroTarjeta)
    const tarjeta = await em.findOneOrFail(Tarjeta, { nroTarjeta });
    await em.removeAndFlush(tarjeta);
    res.status(200).json({ message: 'La tarjeta ha sido eliminada con éxito', data: tarjeta });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, add, update, remove };
