import { Router} from "express"
import { findAll, findOne, add, update, remove, sanitizePlato } from "./plato.controller.js"

export const platoRouter = Router()

platoRouter.get('/', findAll)
platoRouter.get('/:numPlato', findOne)
platoRouter.post('/', sanitizePlato, add)
platoRouter.put('/:numPlato', sanitizePlato, update)
platoRouter.patch('/:numPlato', sanitizePlato, update)
platoRouter.delete('/:numPlato', remove)



