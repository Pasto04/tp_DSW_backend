import { Router } from 'express';
import { sanitizeElaboracionPlato, findAllFromPlato, findAllFromIngrediente, findOne, add, update, remove } from './elaboracionPlato.controller.js';
export const elabPlatoRouter = Router();
//Trabajo asumiendo que puedo utilizar el mismo router en app.ts con 2 URLs distintnas
elabPlatoRouter.get('/:nro/ingredientes', findAllFromPlato);
elabPlatoRouter.get('/:cod/platos', findAllFromIngrediente);
elabPlatoRouter.get('/:nro/ingredientes/:cod', findOne);
elabPlatoRouter.get('/:cod/platos/:nro', findOne);
//¿Qué URL debería asignar a los POST de ElaboraciónPlato? En principio dejo la URL por defecto
elabPlatoRouter.post('/', sanitizeElaboracionPlato, add);
elabPlatoRouter.patch('/:nro/ingredientes/:cod', sanitizeElaboracionPlato, update);
elabPlatoRouter.patch('/:cod/platos/:nro', sanitizeElaboracionPlato, update);
elabPlatoRouter.delete('/:nro/ingredientes/:cod', remove);
elabPlatoRouter.delete('/:cod/platos/:nro', remove);
//# sourceMappingURL=elaboracionPlato.routes.js.map