import { NextFunction, Request, Response } from 'express';
import { orm } from '../../shared/db/orm.js';
import { Pedido } from '../../pedido/pedido.entity.js';
import { PlatoPedido } from './platoPedido.entity.js';
import { Plato } from '../plato.entity.js';
import {
  validarPlatoPedido,
  validarPlatoPedidoToPatch,
} from './platoPedido.schema.js';
import {
  PedidoAlreadyEndedError,
  PedidoNotFoundError,
} from '../../shared/errors/entityErrors/pedido.errors.js';
import { PlatoNotFoundError } from '../../shared/errors/entityErrors/plato.errors.js';
import {
  PlatoPedidoAlreadyDeliveredError,
  PlatoPedidoNotFoundError,
} from '../../shared/errors/entityErrors/platoPedido.errors.js';
import { handleErrors } from '../../shared/errors/errorHandler.js';
import { validarFindAll } from '../../shared/validarFindAll.js';

const em = orm.em;

function sanitizePlatoPedido(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    pedido: req.params.nroPed,
    plato: req.body.plato,
    cantidad: req.body.cantidad,
    fechaSolicitud: req.body.fechaSolicitud,
    horaSolicitud: req.body.horaSolicitud,
    entregado: false,
  };
  next();
}

function isAlreadyDelivered(platoPedido: PlatoPedido): void {
  if (platoPedido.entregado === true) {
    throw new PlatoPedidoAlreadyDeliveredError();
  }
}

function alreadyEnded(pedido: Pedido): void {
  if (pedido.estado !== 'en curso') {
    throw new PedidoAlreadyEndedError();
  }
}

async function add(req: Request, res: Response) {
  try {
    const nroPed = Number.parseInt(req.params.nroPed);
    req.body.sanitizedInput.pedido = await em.findOneOrFail(
      Pedido,
      { nroPed },
      {
        failHandler: () => {
          throw new PedidoNotFoundError();
        },
      }
    );
    const numPlato = req.body.sanitizedInput.plato;
    req.body.sanitizedInput.plato = await em.findOneOrFail(
      Plato,
      { numPlato },
      {
        failHandler: () => {
          throw new PlatoNotFoundError();
        },
      }
    );
    alreadyEnded(req.body.sanitizedInput.pedido); //Validamos que el pedido al que queremos agregar el plato no haya finalizado.
    const platoPedidoValido = validarPlatoPedido(req.body.sanitizedInput);
    const platoPedido = em.create(PlatoPedido, platoPedidoValido);
    em.persist(platoPedido);
    await em.flush();
    res.status(201).json({
      message: `El plato [${platoPedido.plato.descripcion}] ha sido agregado al pedido [${platoPedido.pedido.nroPed}] con éxito`,
      data: platoPedido,
    });
  } catch (error: any) {
    handleErrors(error, res);
  }
}

/*NO TIENE SENTIDO ACTUALIZAR UN PLATO DE UN PEDIDO. SI EL CLIENTE DESEA ORDENAR NUEVAMENTE UN PLATO, SE CREARÁ Y QUEDARÁ 
REGISTRADO CON UNA HORA (Y QUIZÁS UNA FECHA) DISTINTA DENTRO DEL MISMO PEDIDO.
Este método únicamente permitirá a los usuarios (ya sea empleado o cliente) modificar el atributo "entregado" de PlatoPedido a "true".
*/
async function update(req: Request, res: Response) {
  try {
    const numPlato = Number.parseInt(req.params.nro);
    req.body.sanitizedInput.plato = await em.findOneOrFail(
      Plato,
      { numPlato },
      {
        failHandler: () => {
          throw new PlatoNotFoundError();
        },
      }
    );
    const nroPed = Number.parseInt(req.params.nroPed);
    req.body.sanitizedInput.pedido = await em.findOneOrFail(
      Pedido,
      { nroPed },
      {
        populate: ['cliente'],
        failHandler: () => {
          throw new PedidoNotFoundError();
        },
      }
    );
    const platoPedValido = validarPlatoPedidoToPatch(req.body.sanitizedInput);
    const platoPed = await em.findOneOrFail(PlatoPedido, platoPedValido, {
      failHandler: () => {
        throw new PlatoPedidoNotFoundError();
      },
    });
    isAlreadyDelivered(platoPed); //Validamos que el plato no haya sido entregado
    platoPed.establecerFechaYHoraEntrega();
    req.body.sanitizedInput.entregado = true;
    em.assign(platoPed, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({
      message: `El plato [${platoPed.plato.descripcion}] ha sido entregado con éxito`,
      data: platoPed,
    });
  } catch (error: any) {
    handleErrors(error, res);
  }
}

async function remove(req: Request, res: Response) {
  try {
    const numPlato = Number.parseInt(req.params.nro);
    const nroPed = Number.parseInt(req.params.nroPed);
    const plato = await em.findOneOrFail(
      Plato,
      { numPlato },
      {
        failHandler: () => {
          throw new PlatoNotFoundError();
        },
      }
    );
    const pedido = await em.findOneOrFail(
      Pedido,
      { nroPed },
      {
        failHandler: () => {
          throw new PedidoNotFoundError();
        },
      }
    );
    const fechaSolicitud = req.params.fecha;
    const horaSolicitud = req.params.hora;
    const platoPed = await em.findOneOrFail(
      PlatoPedido,
      { plato, pedido, fechaSolicitud, horaSolicitud },
      {
        failHandler: () => {
          throw new PlatoPedidoNotFoundError();
        },
      }
    );
    isAlreadyDelivered(platoPed); //Validamos que el plato no haya sido entregado
    await em.removeAndFlush(platoPed);
    res.status(200).json({
      message: `El plato [${platoPed.plato.descripcion}] ha sido eliminado del pedido`,
      data: platoPed,
    });
  } catch (error: any) {
    handleErrors(error, res);
  }
}

export { add, update, remove, sanitizePlatoPedido };
