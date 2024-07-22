import { Repository } from "../shared/repository.js";
import {Pedido} from "./pedido.entity.js"
import { Cliente } from "../cliente/cliente.entity.js";
//repository
const pedidos = [
  new Pedido(
    'Ocupada',
    new Date(2023, 6, 20),
    (() => {
      const hora = new Date();
      hora.setHours(14, 30, 0, 0); // Establecer hora a las 14:30:00
      return hora;
    })(),
    7,
    'd0c48218-7b5b-4796-8569-a6b24e638e9f',
    new Cliente('juan', 'pastorino', 'juan@gmail', 123124145,'d0c48218-7b5b-4796-8569-a6b24e638e9f' )
  )
]

export class PedidoRepository implements Repository <Pedido>{ 
  public findAll(): Pedido[] | undefined {
    return pedidos 
  }

  public findOne(item: { codigo: string; }): Pedido | undefined {
    return pedidos.find((pedido) => pedido.nroPed === item.codigo)
  }

  public add(item: Pedido): Pedido | undefined {
    pedidos.push(item)
    return item
  }

  public update(item: Pedido): Pedido | undefined {
    const pedidoIdx = pedidos.findIndex(pedido => pedido.nroPed === item.nroPed)

    if(pedidoIdx !== -1){
      pedidos[pedidoIdx] = {...pedidos[pedidoIdx], ...item }
    }
    return pedidos[pedidoIdx]
  }

  public delete(item: { codigo: string; }): Pedido | undefined {
    const pedidoIdx = pedidos.findIndex(pedido => pedido.nroPed === item.codigo)

    if (pedidoIdx !== -1){
      const pedidosborrados = pedidos[pedidoIdx]
      pedidos.splice(pedidoIdx,1)
      return pedidosborrados
    }
  }

}