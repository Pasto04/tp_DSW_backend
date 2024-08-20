import { Reseña } from './reseña.entity.js'
import { Pedido } from './pedido.entity.js'
import { orm } from '../shared/db/orm.js'

const em = orm.em

em.getRepository(Reseña)

async function findAll(req, res) {
  try{
    const reseñas = await em.find(Reseña, {})
    res.status(200).json({message: 'Todas las reseñas fueron encontrados', data: reseñas})
  } catch(error) {
    res.status(500).json({message: error.message})
  }
  
}

async function findOne(req, res) {
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, { nroPed: nroPed });
    const reseña = await em.findOneOrFail(Reseña, { pedido: pedido });
    res.status(200).json({message: 'La reseña fue encontrado con éxito', data: reseña})
  } catch(error) {
    res.status(500).json({message: error.message})
  }
  
}

async function add(req, res) {
  try{
    const reseña = em.create(Reseña, req.body)
    await em.flush(),
    res.status(201).json({message: 'La reseña fue creada con éxito', data: reseña})
  } catch(error){
    res.status(500).json({message: error.message})
  }
}

async function update(req, res) {
  try{
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, { nroPed: nroPed });
    const reseña = await em.findOneOrFail(Reseña, { pedido: pedido });
    em.assign(reseña, req.body)
    await em.flush()
    res.status(200).json({message: 'La reseña fue actualizada con éxito', data: reseña})
  } catch(error){
    res.status(500).json({message: error.message})
  }
}

async function remove (req, res) {
  try {
    const nroPed = Number.parseInt(req.params.nroPed)
    const pedido = await em.findOneOrFail(Pedido, { nroPed: nroPed });
    const deletedReseña = await em.findOneOrFail(Reseña, { pedido: pedido }) 
    await em.removeAndFlush(deletedReseña)
    res.status(200).json({message: 'La reseña ha sido eliminada con éxito', data: deletedReseña})
  } catch(error){
    res.status(500).json({message: error.message})
  }
}

export {findAll, findOne, add, update, remove }