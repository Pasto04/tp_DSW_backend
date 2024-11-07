import { Request, Response, NextFunction } from 'express';
import { orm } from '../../shared/db/orm.js';
import { Pedido } from '../../pedido/pedido.entity.js';
import { BebidaPedido } from './bebidaPedido.entity.js';
import { Bebida } from '../bebida.entity.js';
import {
  validarBebidaPedido,
  validarBebidaPedidoToPatch,
} from './bebidaPedido.schema.js';
import { handleErrors } from '../../shared/errors/errorHandler.js';
import {
  PedidoAlreadyEndedError,
  PedidoNotFoundError,
} from '../../shared/errors/entityErrors/pedido.errors.js';
import { BebidaNotFoundError } from '../../shared/errors/entityErrors/bebida.errors.js';
import {
  BebidaPedidoAlreadyDeliveredError,
  BebidaPedidoNotFoundError,
} from '../../shared/errors/entityErrors/bebidaPedido.errors.js';

const em = orm.em;

function sanitizeBebidaPedido(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    bebida: req.body.bebida,
    pedido: req.params.nroPed,
    cantidad: req.body.cantidad,
    entregado: false,
    fechaSolicitud: req.body.fechaSolicitud,
    horaSolicitud: req.body.horaSolicitud,
  };
  next();
}

function isAlreadyDelivered(bebidaPedido: BebidaPedido): void {
  if (bebidaPedido.entregado === true) {
    throw new BebidaPedidoAlreadyDeliveredError();
  }
}

function alreadyEnded(pedido: Pedido): void {
  if (pedido.estado !== 'en curso') {
    throw new PedidoAlreadyEndedError();
  }
}

//Esta funcionalidad permite agregar una bebida a un pedido. La bebida debe existir en la base de datos y el pedido debe estar en estado "en curso".
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
    const codBebida = req.body.sanitizedInput.bebida;
    req.body.sanitizedInput.bebida = await em.findOneOrFail(
      Bebida,
      { codBebida },
      {
        failHandler: () => {
          throw new BebidaNotFoundError();
        },
      }
    );
    alreadyEnded(req.body.sanitizedInput.pedido); //Validamos que el pedido no haya finalizado
    const bebidaPedidoValida = validarBebidaPedido(req.body.sanitizedInput);
    const bebidaPedido = em.create(BebidaPedido, bebidaPedidoValida);
    em.persist(bebidaPedido);
    await em.flush();
    res.status(201).json({
      message: `La bebida ${bebidaPedido.bebida.descripcion} ha sido agregada al pedido ${bebidaPedido.pedido.nroPed} con éxito`,
      data: bebidaPedido,
    });
  } catch (error: any) {
    handleErrors(error, res);
  }
}

/* NO TIENE SENTIDO ACTUALIZAR UNA BEBIDA DE UN PEDIDO. SI EL CLIENTE DESEA ORDENAR NUEVAMENTE UNA BEBIDA, SE CREARÁ Y QUEDARÁ 
REGISTRADA CON UNA HORA (Y QUIZÁS UNA FECHA) DISTINTA DENTRO DEL MISMO PEDIDO.
Este método únicamente permitirá a los usuarios (ya sea empleado o cliente) modificar el atributo "entregado" de BebidaPedido a "true".
*/
async function update(req: Request, res: Response) {
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
    const codBebida = Number.parseInt(req.params.codBebida);
    req.body.sanitizedInput.bebida = await em.findOneOrFail(
      Bebida,
      { codBebida },
      {
        failHandler: () => {
          throw new BebidaNotFoundError();
        },
      }
    );
    const bebidaPedidoValida = validarBebidaPedidoToPatch(
      req.body.sanitizedInput
    );
    const bebidaPedido = await em.findOneOrFail(
      BebidaPedido,
      bebidaPedidoValida,
      {
        failHandler: () => {
          throw new BebidaPedidoNotFoundError();
        },
      }
    );
    isAlreadyDelivered(bebidaPedido); //Validamos que la bebida no haya sido entregada
    req.body.sanitizedInput.entregado = true;
    bebidaPedido.establecerFechaYHoraEntrega();
    em.assign(bebidaPedido, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({
      message: `La bebida ${bebidaPedido.bebida.descripcion} del pedido ${bebidaPedido.pedido.nroPed} ha sido entregada con éxito`,
      data: bebidaPedido,
    });
  } catch (error: any) {
    handleErrors(error, res);
  }
}

async function remove(req: Request, res: Response) {
  try {
    const nroPed = Number.parseInt(req.params.nroPed);
    const pedido = await em.findOneOrFail(
      Pedido,
      { nroPed },
      {
        populate: ['cliente', 'mesa'],
        failHandler: () => {
          throw new PedidoNotFoundError();
        },
      }
    );
    const codBebida = Number.parseInt(req.params.codBebida);
    const bebida = await em.findOneOrFail(
      Bebida,
      { codBebida },
      {
        failHandler: () => {
          throw new BebidaNotFoundError();
        },
      }
    );
    const fechaSolicitud = req.params.fecha;
    const horaSolicitud = req.params.hora;
    const bebidaPedido = await em.findOneOrFail(
      BebidaPedido,
      { pedido, bebida, fechaSolicitud, horaSolicitud },
      {
        failHandler: () => {
          throw new BebidaPedidoNotFoundError();
        },
      }
    );
    isAlreadyDelivered(bebidaPedido); //Validamos que la bebida no haya sido entregada. Dado ese caso, no puede eliminarse del pedido.
    await em.removeAndFlush(bebidaPedido);
    res.status(200).json({
      message: `La bebida ${bebida.descripcion} del pedido ${pedido.nroPed} ha sido eliminada con éxito`,
      data: bebidaPedido,
    });
  } catch (error: any) {
    handleErrors(error, res);
  }
}

export { sanitizeBebidaPedido, add, update, remove };
