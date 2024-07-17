import { Repository } from "../shared/repository.js";
import { TipoPlato } from "../tipoplato/tipoplato.entity.js";
import { Plato } from "./plato.entity.js";



const platos=[
  new Plato(
    'b780c4c6-68c2-4177-2004-af0102a99d39',
    new TipoPlato("Plato pricipal",'b780c4c6-68c2-4177-8371-af0102a66d39'),
    "Fideos al Pesto",
    25
  )
]
export class PlatoRepository implements Repository<Plato>{

  public findAll(): Plato[] | undefined {
    return platos
  }
  public findOne(item: { codigo: string; }): Plato | undefined {
    return platos.find((plato) =>plato.nro===item.codigo)
  }
  public add(item: Plato): Plato | undefined {
    platos.push(item)
    return item
  }

  public update(item: Plato): Plato | undefined {
    const platoIdx = platos.findIndex((plato) => plato.nro === item.nro)
    if (platoIdx !== -1) {
      platos[platoIdx] = {...platos[platoIdx], ...item}
     }
    return platos[platoIdx]
  }
  
  public delete(item: { codigo: string; }): Plato | undefined {
    const platoIdx = platos.findIndex((plato) =>plato.nro===item.codigo)
    if(platoIdx !== -1){
      const deletePlato = platos[platoIdx]
      platos.splice(platoIdx,1)
      return deletePlato
    }
  } 
}