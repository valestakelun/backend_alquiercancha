import Producto from "../models/producto.js";
// CREAR
export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al crear producto" });
  }
};