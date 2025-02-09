import { Router } from 'express'
import {sanitizeElaboracionPlato, findAll, findOne, update, remove} from './elaboracionPlato.controller.js'

export const elabPlatoRouter = Router()

elabPlatoRouter.get('/:nro/ingredientes', findAll)
elabPlatoRouter.get('/:nro/ingredientes/:cod', findOne)
elabPlatoRouter.patch('/:nro/ingredientes/:cod', update)
elabPlatoRouter.delete('/:nro/ingredientes/:cod', remove)

