import { Router } from "express";
import { sanitizeElaboracionPlato, findAll, findOne, add, update, remove } from "./elaboracionPlato.controler.js";
export const elaboracionPlatoRouter = Router();
elaboracionPlatoRouter.get('/', findAll);
elaboracionPlatoRouter.get('/:codIngrediente.:nro', sanitizeElaboracionPlato, findOne);
elaboracionPlatoRouter.post('/', sanitizeElaboracionPlato, add);
elaboracionPlatoRouter.put('/:codIngrediente.:nro', sanitizeElaboracionPlato, update);
elaboracionPlatoRouter.patch('/:codIngrediente.:nro', sanitizeElaboracionPlato, update);
elaboracionPlatoRouter.delete('/:codIngrediente.:nro', sanitizeElaboracionPlato, remove);
//Necesito saber cómo puedo ingresar dos códigos en una misma consulta (ej: código de ingrediente y código de plato)
//https://expressjs.com/en/guide/routing.html
//En esta página pude encontrar la respuesta...
//GET http://localhost:3000/api/elaboracionesPlato/:codIngrediente.:nro o 
//GET http://localhost:3000/api/elaboracionesPlato/:codIngrediente-:nro
//# sourceMappingURL=elaboracionPlato.routes.js.map