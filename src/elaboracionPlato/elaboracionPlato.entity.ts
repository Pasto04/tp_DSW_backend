import { Plato } from "../plato/plato.entity.js";
import { Ingrediente } from "../ingrediente/ingrediente.entity.js";

export class ElaboracionPlato {
  constructor(
    public ingrediente: Ingrediente,
    public plato: Plato,
    public cantIngreNecesaria: number
  ) {}
}