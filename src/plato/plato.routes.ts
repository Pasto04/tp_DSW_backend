import { Router} from "express"
import { findAll, findOne, add, update, remove, sanitizePlato } from "./plato.controller.js"
import { verificarToken } from "../shared/authMiddleware.js"

export const platoRouter = Router()

platoRouter.get('/', findAll)
platoRouter.get('/:numPlato', findOne)
platoRouter.post('/', verificarToken, sanitizePlato, add)
platoRouter.put('/:numPlato', verificarToken, sanitizePlato, update)
platoRouter.patch('/:numPlato', verificarToken, sanitizePlato, update)
platoRouter.delete('/:numPlato', verificarToken, remove)



