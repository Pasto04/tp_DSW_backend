import { repository } from "../shared/repository.js";
import {Cliente} from "./cliente.entity.js"

const clientes = [
  new Cliente(
    'Juan',
    'Pastorino',
    'juanjose@gmail.com',
    3462670753,
    'd0c48218-7b5b-4796-8569-a6b24e638e9f'
  )
]

export class ClienteRepository implements repository <Cliente>{ 
  public findAll(): Cliente[] | undefined {
    return clientes 
  }

  public findOne(item: { id: string; }): Cliente | undefined {
    return clientes.find((cliente) => cliente.id === item.id)
  }

  public add(item: Cliente): Cliente | undefined {
    clientes.push(item)
    return item
  }

  public update(item: Cliente): Cliente | undefined {
    const clienteIdx = clientes.findIndex(cliente => cliente.id === item.id)

    if(clienteIdx !== -1){
      clientes[clienteIdx] = {...clientes[clienteIdx], ...item }
    }
    return clientes[clienteIdx]
  }

  public delete(item: { id: string; }): Cliente | undefined {
    const clienteIdx = clientes.findIndex(cliente => cliente.id === item.id)

    if (clienteIdx !== -1){
      const clientesborrados = clientes[clienteIdx]
      clientes.splice(clienteIdx,1)
      return clientesborrados
    }
  }

}