import { Router } from 'express'
import {sanitizeElaboracionPlato, findAll, findOne, update, remove} from './elaboracionPlato.controller.js'
import { verificarToken } from '../../shared/authMiddleware.js'

export const elabPlatoRouter = Router()

elabPlatoRouter.get('/:nro/ingredientes', findAll)
elabPlatoRouter.get('/:nro/ingredientes/:cod', findOne)
elabPlatoRouter.patch('/:nro/ingredientes/:cod', verificarToken, update)
elabPlatoRouter.delete('/:nro/ingredientes/:cod', verificarToken, remove)

