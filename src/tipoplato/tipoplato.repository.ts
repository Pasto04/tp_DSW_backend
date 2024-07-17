import { Repository } from "../shared/repository.js";
import { TipoPlato } from "./tipoplato.entity.js";



const tipoplatos=[
  new TipoPlato(
    "Plato Principal",
    'b780c4c6-68c2-4177-8371-af0102a66d39'
  )
]
export class TipoPlatoRepository implements Repository<TipoPlato>{

  public findAll(): TipoPlato[] | undefined {
    return tipoplatos
  }
  public findOne(item: { codigo: string; }): TipoPlato | undefined {
    return tipoplatos.find((tipoplato) =>tipoplato.id===item.codigo)
  }
  public add(item: TipoPlato): TipoPlato | undefined {
    tipoplatos.push(item)
    return item
  }

  public update(item: TipoPlato): TipoPlato | undefined {
      const tipoplatoIdx = tipoplatos.findIndex((tipoplato) => tipoplato.id === item.id)
      if (tipoplatoIdx !== -1) {
       tipoplatos[tipoplatoIdx] = {...tipoplatos[tipoplatoIdx], ...item}
     }
     return tipoplatos[tipoplatoIdx]
  }
  
  public delete(item: { codigo: string; }): TipoPlato | undefined {
    const tipoplatoIdx = tipoplatos.findIndex((tipoplato) =>tipoplato.id===item.codigo)
    if(tipoplatoIdx!==-1){
      const deleteTipoPlato = tipoplatos[tipoplatoIdx]
      tipoplatos.splice(tipoplatoIdx,1)
      return deleteTipoPlato
    }
  } 
}