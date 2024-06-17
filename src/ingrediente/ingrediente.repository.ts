import { Repository } from "../shared/repository.js";
import { Ingrediente } from "./ingrediente.entity.js";
import { TipoIngrediente } from "../tipo-ingrediente/tipo-ingrediente.entity.js";

const ingredientes = [
  new Ingrediente(
    'b780c456-68s2-4177-5371-af0102199j38',
    'Tomate Europeo',
    50,
    20,
    new TipoIngrediente('b780c4c6-68c2-4177-8371-af0102a99d38', 'Verdura')
  )
]

export class IngredienteRepository implements Repository<Ingrediente> {

  public findAll(): Ingrediente[] | undefined {
    return ingredientes
  }

  public findOne(item: { codigo:string; }): Ingrediente | undefined {
    return ingredientes.find((ingre) => ingre.codIngrediente === item.codigo)
  }

  public add(item: Ingrediente): Ingrediente | undefined {
    ingredientes.push(item)
    return item
  }

  public update(item: Ingrediente): Ingrediente | undefined {
    const ingreIndex = ingredientes.findIndex((ingre) => ingre.codIngrediente === item.codIngrediente)
    if (ingreIndex !== -1) {
      ingredientes[ingreIndex] = {...ingredientes[ingreIndex], ...item}
    }
    return ingredientes[ingreIndex]
  }

  public delete(item: {codigo:string}): Ingrediente | undefined {
     const ingreIndex = ingredientes.findIndex((ingre) => ingre.codIngrediente === item.codigo)
    if (ingreIndex !== -1) {
      const deletedIngrediente = ingredientes[ingreIndex]
      ingredientes.splice(ingreIndex, 1)
      return deletedIngrediente
    }
  }
}