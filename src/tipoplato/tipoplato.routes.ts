import { Router} from "express";
import { sanitizeTipoPlatoInput, findAll, findOne, add, update, remove } from "./tipoplato.controler.js";

export const tipoplatoRouter = Router()

tipoplatoRouter.get('/', findAll)
tipoplatoRouter.get('/:id', findOne)
tipoplatoRouter.post('/', sanitizeTipoPlatoInput, add)
tipoplatoRouter.put('/:id', sanitizeTipoPlatoInput, update)
tipoplatoRouter.patch('/:id', sanitizeTipoPlatoInput, update)
tipoplatoRouter.delete('/:id', sanitizeTipoPlatoInput, remove)



