import { Router} from "express";
import { sanitizePlatoInput, findAll, findOne, add, update, remove } from "./plato.controler.js";

export const platoRouter = Router()

platoRouter.get('/', findAll)
platoRouter.get('/:nro', findOne)
platoRouter.post('/', sanitizePlatoInput, add)
platoRouter.put('/:nro', sanitizePlatoInput, update)
platoRouter.patch('/:nro', sanitizePlatoInput, update)
platoRouter.delete('/:nro', sanitizePlatoInput, remove)



