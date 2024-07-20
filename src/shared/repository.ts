export interface repository <T> {
  findAll(): T[] | undefined
  findOne(item: {nroPed: string}): T | undefined
  add(item: T): T | undefined 
  update(item: T): T | undefined 
  delete(item: {nroPed: string} ): T | undefined 
}