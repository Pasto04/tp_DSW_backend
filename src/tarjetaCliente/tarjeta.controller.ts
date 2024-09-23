import { Request, Response } from 'express';
import { Tarjeta } from './tarjeta.entity.js';
import { orm } from '../shared/db/orm.js';
import { validarTarjeta } from './tarjeta.schema.js';
import z from 'zod'
import { TarjetaUniqueConstraintViolation } from '../shared/errors/entityErrors/tarjeta.errors.js';

const em = orm.em;

em.getRepository(Tarjeta)

function handleErrors(error: any, res: Response) {
  if (error instanceof z.ZodError) {
    res.status(400).json({ message: JSON.parse(error.message)[0].message })
  } else if (error.name === 'NotFoundError') {
    res.status(404).json({message: 'La tarjeta no ha sido encontrada'})
  } else if (error.name === 'UniqueConstraintViolationException') {
    res.status(400).json({ message: error.sqlMessage })
  } else {
    res.status(500).json({ message: error.message })
  }
}

// Obtener todas las tarjetas
async function findAll(req: Request, res: Response) {
  try {
    const tarjetas = await em.find(Tarjeta, {});
    res.status(200).json({ message: 'Todas las tarjetas fueron encontradas', data: tarjetas });
  } catch (error: any) {
    handleErrors(error, res)
  }
}

// Obtener una tarjeta por su ID
async function findOne(req: Request, res: Response) {
  try {
    const idTarjeta = Number.parseInt(req.params.idTarjeta)
    const tarjeta = await em.findOneOrFail(Tarjeta, { idTarjeta });
    res.status(200).json({ message: 'La tarjeta fue encontrada con éxito', data: tarjeta });
  } catch (error: any) {
    handleErrors(error, res)
  }
}

// Crear una nueva tarjeta
async function add(req: Request, res: Response) {
  try {
    const tarjetaValida = validarTarjeta(req.body)
    const tarjeta = em.create(Tarjeta, tarjetaValida);
    await em.flush();
    res.status(201).json({ message: 'La tarjeta fue creada con éxito', data: tarjeta });
  } catch (error: any) {
    if(error.name === 'UniqueConstraintViolationException') {
      error = new TarjetaUniqueConstraintViolation
    }
    handleErrors(error, res)
  }
}

// Actualizar una tarjeta existente
async function update(req: Request, res: Response) {
  try {
    const tarjetaValida = validarTarjeta(req.body)
    const idTarjeta = Number.parseInt(req.params.idTarjeta)
    const tarjeta = await em.findOneOrFail(Tarjeta, { idTarjeta });
    em.assign(tarjeta, tarjetaValida);
    await em.flush();
    res.status(200).json({ message: 'La tarjeta fue actualizada con éxito', data: tarjeta });
  } catch (error: any) {
    if(error.name === 'UniqueConstraintViolationException') {
      error = new TarjetaUniqueConstraintViolation
    }
    handleErrors(error, res)
  }
}

// Eliminar una tarjeta
async function remove(req: Request, res: Response) {
  try {
    const idTarjeta = Number.parseInt(req.params.idTarjeta)
    const tarjeta = await em.findOneOrFail(Tarjeta, { idTarjeta });
    await em.removeAndFlush(tarjeta);
    res.status(200).json({ message: 'La tarjeta ha sido eliminada con éxito', data: tarjeta });
  } catch (error: any) {
    handleErrors(error, res)
  }
}

export { findAll, findOne, add, update, remove };
