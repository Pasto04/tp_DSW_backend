import { z } from "zod";
import { IngredienteDeProveedor } from "../ingredienteDeProveedor/ingredienteDeProveedor.entity.js";
import { BebidaDeProveedor } from "../bebidaDeProveedor/bebidaDeProveedor.entity.js";

 const proveedorSchema = z.object({
  id: z.number().int().positive().optional(),
  cuit: z.string({required_error: "El cuit es requerido", invalid_type_error: "El cuit debe ser un string"}),
  razonSocial: z.string({required_error: "La razon social es requerida", invalid_type_error: "La razon social debe ser un string"}),
  direccion: z.string({required_error: "La direccion es requerida", invalid_type_error: "La direccion debe ser un string"}),
  ciudad: z.string({required_error: "La ciudad es requerida", invalid_type_error: "La ciudad debe ser un string"}),
  provincia: z.string({required_error: "La provincia es requerida", invalid_type_error: "La provincia debe ser un string"}),
  pais: z.string({required_error: "El país es requerido", invalid_type_error: "El país debe ser un string"}),
  telefono: z.string({required_error: "El teléfono es requerido", invalid_type_error: "El teléfono debe ser un string"}),
  email: z.string({required_error: "El email es requerido", invalid_type_error: "El email debe ser un string"})
         .email({ message: "El email debe ser válido"}),
  ingredienteDeProveedor: z.array(z.instanceof(IngredienteDeProveedor)).optional(),
  bebidasDeProveedor: z.array(z.instanceof(BebidaDeProveedor)).optional()
});

 const proveedorToPatchSchema = z.object({
  id: z.number().int().positive().optional(),
  cuit: z.string({invalid_type_error: 'El cuit debe ser un string'}).optional(),
  razonSocial: z.string({invalid_type_error: 'La razón social debe ser un string'}).optional(),
  direccion: z.string({invalid_type_error: 'La dirección debe ser un string'}).optional(),
  ciudad: z.string({invalid_type_error: 'La ciudad debe ser un string'}).optional(),
  provincia: z.string({invalid_type_error: 'La provincia debe ser un string'}).optional(),
  pais: z.string({invalid_type_error: 'El país debe ser un string'}).optional(),
  telefono: z.string({invalid_type_error: 'El teléfono debe ser un string'}).optional(),
  email: z.string({invalid_type_error: 'El email debe ser un string'}).email({ message: "El email debe ser válido" }).optional(),
  ingredienteDeProveedor: z.array(z.instanceof(IngredienteDeProveedor)).optional(),
  bebidasDeProveedor: z.array(z.instanceof(BebidaDeProveedor)).optional()
})

function validarProveedor(object: any) {
  try{
    return proveedorSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

function validarProveedorPatch(object: any) {
  try {
    return proveedorToPatchSchema.parse(object)
  } catch (error: any) {
    throw error
  }
}

export { validarProveedor, validarProveedorPatch }