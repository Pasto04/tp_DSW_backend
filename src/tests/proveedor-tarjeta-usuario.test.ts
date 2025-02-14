import { app } from '../app'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

//TESTING DEL CRUD DE LA ENTIDAD "PROVEEDOR"
describe('Testing del CRUD de la entidad Proveedor', () => {

  //TESTING DEL MÉTODO "GET"
  it('Solicitamos todos los proveedores y devuelve con código de estado de 200', async () => {
    const response = await request(app).get('/api/proveedores')
    expect(response.status).toBe(200)
  })
  it('Solicitamos un proveedor existente y devuelve un código de estado de 200', async () => {
    const response = await request(app).get('/api/proveedores/1')
    expect(response.status).toBe(200)
  })
  it('Solicitamos un proveedor que no existe y devuelve un código de estado de 404', async () => {
    const response = await request(app).get('/api/proveedores/1000')
    expect(response.status).toBe(404)
  })

  //TESTING DEL MÉTODO "POST"
  it('Solicitamos crear un nuevo proveedor y devuelve un código de estado de 201', async () => {
    const response = await request(app).post('/api/proveedores').send({
      cuit: "20452157393",
      razonSocial: "Judgement",
      direccion: "Invisible Street 123",
      ciudad: "Academic City",
      provincia: "Neverland",
      pais: "Neverland",
      telefono: "81 72 75849123",
      email: "skuroko@gmail.com"
    })
    expect(response.status).toBe(201)
  })
  it('Solicitamos crear un nuevo proveedor con cuil ya registrado y devuelve un código de estado de 400', async () => {
    const response = await request(app).post('/api/proveedores').send({
      cuit: "65784532675",
      razonSocial: "Judgemento",
      direccion: "Invisible Street 1234",
      ciudad: "Academic City",
      provincia: "Neverland",
      pais: "Neverland",
      telefono: "81 72 75849124",
      email: "shkuroko@gmail.com"
    })
    expect(response.status).toBe(400)
  })
  it('Solicitamos crear un nuevo proveedor con razón social ya registrada y devuelve un código de estado de 400', async () => {
    const response = await request(app).post('/api/proveedores').send({
      cuit: "20452157394",
      razonSocial: "Red Bull",
      direccion: "Invisible Street 1234",
      ciudad: "Academic City",
      provincia: "Neverland",
      pais: "Neverland",
      telefono: "81 72 75849124",
      email: "shkuroko@gmail.com"
    })
    expect(response.status).toBe(400)
  })
  it('Solicitamos crear un nuevo proveedor con teléfono ya registrado y devuelve un código de estado de 400', async () => {
    const response = await request(app).post('/api/proveedores').send({
      cuit: "20452157395",
      razonSocial: "Judgemento",
      direccion: "Invisible Street 1234",
      ciudad: "Academic City",
      provincia: "Neverland",
      pais: "Neverland",
      telefono: "+54 9 3462 522974",
      email: "shkuroko@gmail.com"
    })
    expect(response.status).toBe(400)
  })
  it('Solicitamos crear un nuevo proveedor con email ya registrado y devuelve un código de estado de 400', async () => {
    const response = await request(app).post('/api/proveedores').send({
      cuit: "20452157396",
      razonSocial: "Judgemento",
      direccion: "Invisible Street 1234",
      ciudad: "Academic City",
      provincia: "Neverland",
      pais: "Neverland",
      telefono: "81 72 75849124",
      email: "contactHunkel@gmail.com"
    })
    expect(response.status).toBe(400)
  })

  //TESTING DEL MÉTODO "PUT"
  it('Solicitamos modificar los datos de un proveedor existente y devuelve un código de estado de 200', async () => {
    const response = await request(app).put('/api/proveedores/1').send({
      cuit: "20452159982",
      razonSocial: "HunKel S.A",
      direccion: "Dorrego 1265",
      ciudad: "Venado Tuerto",
      provincia: "Santa Fe",
      pais: "Argentina",
      telefono: "+54 9 3462 522974",
      email: "contactHunkel@gmail.com"
    })
    expect(response.status).toBe(200)
  })
  it('Solicitamos modificar los datos de un proveedor inexistente y devuelve un código de estado de 404', async () => {
    const response = await request(app).put('/api/proveedores/1000').send({
      cuit: "20452159982",
      razonSocial: "HunKel S.A.",
      direccion: "Dorrego 1265",
      ciudad: "Venado Tuerto",
      provincia: "Santa Fe",
      pais: "Argentina",
      telefono: "+54 9 3462 522974",
      email: "contactHunkel@gmail.com"
    })
    expect(response.status).toBe(404)
  })
  it('Solicitamos modificar los datos de un proveedor pero falta/n alguno/s de sus datos, por lo que devuelve un código de estado de 400', async () => {
    const response = await request(app).put('/api/proveedores/4').send({
      cuit: "12345678912",
      razonSocial: "Pasto.S.A",
      direccion: "Mendoza 543",
      provincia: "Santa Fe",
      pais: "Argentina",
      telefono: "+54 3462 467503"
    })
    expect(response.status).toBe(400)
  })
  it('Solicitamos modificar los datos de un proveedor pero el CUIL ingresado ya se encuentra registrado, por lo que devuelve un código de estado de 400', async () => {
    const response = await request(app).put('/api/proveedores/4').send({
      cuit: "65784532675",
      razonSocial: "Pasto.S.A",
      direccion: "Mendoza 543",
      ciudad: "Rosario",
      provincia: "Santa Fe",
      pais: "Argentina",
      telefono: "+54 3462 467503",
      email: "pasto@gmail.com"
    })
    expect(response.status).toBe(400)
  })
  it('Solicitamos modificar los datos de un proveedor pero la razón social ingresada ya se encuentra registrada, por lo que devuelve un código de estado de 400', async () => {
    const response = await request(app).put('/api/proveedores/4').send({
      cuit: "12345678912",
      razonSocial: "Red Bull",
      direccion: "Mendoza 543",
      ciudad: "Rosario",
      provincia: "Santa Fe",
      pais: "Argentina",
      telefono: "+54 3462 467503",
      email: "pasto@gmail.com"
    })
    expect(response.status).toBe(400)
  })
  it('Solicitamos modificar los datos de un proveedor pero el teléfono ingresado ya se encuentra registrado, por lo que devuelve un código de estado de 400', async () => {
    const response = await request(app).put('/api/proveedores/4').send({
      cuit: "12345678912",
      razonSocial: "Pasto.S.A",
      direccion: "Mendoza 543",
      ciudad: "Rosario",
      provincia: "Santa Fe",
      pais: "Argentina",
      telefono: "+54 3462 890523",
      email: "pasto@gmail.com"
    })
    expect(response.status).toBe(400)
  })
  it('Solicitamos modificar los datos de un proveedor pero el email ingresado ya se encuentra registrado, por lo que devuelve un código de estado de 400', async () => {
    const response = await request(app).put('/api/proveedores/4').send({
      cuit: "12345678912",
      razonSocial: "Pasto.S.A",
      direccion: "Mendoza 543",
      ciudad: "Rosario",
      provincia: "Santa Fe",
      pais: "Argentina",
      telefono: "+54 3462 467503",
      email: "redbull@gmail.com"
    })
    expect(response.status).toBe(400)
  })

  //TESTING DEL MÉTODO "DELETE"
  it('Solicitamos eliminar un proveedor existente y devuelve un código de estado de 200', async () => {
    await request(app).post('/api/proveedores').send({
      cuit: "20452156693",
      razonSocial: "DeleteMe S.A.",
      direccion: "Invisible Street 123456",
      ciudad: "Neverland",
      provincia: "Neverland",
      pais: "Neverland",
      telefono: "00 00 000000",
      email: "noreply@gmail.com"
    })
    const getResponse = await request(app).get('/api/proveedores')
    let newId = getResponse.body.data[getResponse.body.data.length - 1].id
    const deleteResponse = await request(app).delete(`/api/proveedores/${newId}`) 
    expect(deleteResponse.status).toBe(200)
  })
  it('Solicitamos eliminar un proveedor existente pero, como existen ingredientes asociados a este proveedor, devuelve un código de estado de 400', async () => {
    const response = await request(app).delete('/api/proveedores/6') 
    expect(response.status).toBe(400)
  })
  it('Solicitamos eliminar un proveedor existente pero, como existen bebidas asociadas a este proveedor, devuelve un código de estado de 400', async () => {
    const response = await request(app).delete('/api/proveedores/4') 
    expect(response.status).toBe(400)
  })

})


//TESTING DEL CRUD DE LA ENTIDAD "TARJETA"
describe('Testing del CRUD de la entidad Tarjeta', () => {

  //TESTING DEL MÉTODO "GET"
  it('Solicitamos todos los proveedores de la entidad Tarjeta, devuelve un código de estado de 200', async () => {
    const response = await request(app).get('/api/tarjetas')
    expect(response.status).toBe(200)
  })
  it('Solicitamos una tarjeta existente, devuelve un código de estado de 200', async () => {
    const response = await request(app).get('/api/tarjetas/2')
    expect(response.status).toBe(200)
  })
  it('Solicitamos una tarjeta no existente, devuelve un código de estado de 404', async () => {
    const response = await request(app).get('/api/tarjetas/1000')
    expect(response.status).toBe(404)
  })

  //TESTING DEL MÉTODO "POST"
  it('Solicitamos crear una nueva tarjeta y devuelve un código de estado de 201', async () => {
    const response = await request(app).post('/api/tarjetas').send({
      descTarjeta: 'Visa Platinum'
    })
    expect(response.status).toBe(201)
  })

  //TESTING DEL MÉTODO "PUT"
  it('Solicitamos modificar los datos de una tarjeta existente y devuelve un código de estado de 200', async () => {
    const getResponse = await request(app).get('/api/tarjetas')
    const idTarjeta = getResponse.body.data[getResponse.body.data.length - 1].idTarjeta
    const response = await request(app).put(`/api/tarjetas/${idTarjeta}`).send({
      descTarjeta: 'Mastercard Black'
    })
    expect(response.status).toBe(200)
  })
  it('Solicitamos modificar los datos de una tarjeta inexistente y devuelve un código de estado de 404', async () => {
    const response = await request(app).put('/api/tarjetas/1000').send({
      descTarjeta: 'Mastercard Black'
    })
    expect(response.status).toBe(404)
  })
    it('Solicitamos modificar los datos de una tarjeta existente pero, como su nombre está repetido, devuelve un código de estado de 400', async () => {
    const response = await request(app).put('/api/tarjetas/2').send({
      descTarjeta: 'Amex Black'
    })
    expect(response.status).toBe(400)
  })

  //TESTING DEL MÉTODO "DELETE"
  it('Solicitamos eliminar una tarjeta existente y devuelve un código de estado de 200', async () => {
    const postResponse = await request(app).post('/api/tarjetas').send({
      descTarjeta: 'DeleteMe'
    })
    const idTarjeta = postResponse.body.data.idTarjeta
    const response = await request(app).delete(`/api/tarjetas/${idTarjeta}`)
    expect(response.status).toBe(200)
  })
  it('Solicitamos eliminar una tarjeta inexistente y devuelve un código de estado de 404', async () => {
    const response = await request(app).delete('/api/tarjetas/10000')
    expect(response.status).toBe(404)
  })

})

//TESTING DEL CRUD DE LA ENTIDAD "USUARIO"
describe('Testing del CRUD de la entidad Usuario', () => {

  //TESTING DEL MÉTODO "GET"
  it('Solicitamos todos los usuarios y devuelve un código de estado de 200', async () => {
    const response = await request(app).get('/api/usuarios')
    expect(response.status).toBe(200)
  })

  //TESTING DEL MÉTODO "POST"


  //TESTING DEL LOGIN Y LOGOUT


  //TESTING DEL MÉTODO "PUT"


  //TESTING DEL MÉTODO "DELETE"


})