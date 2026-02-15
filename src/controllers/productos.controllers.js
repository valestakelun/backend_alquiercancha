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

export const listarProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar mostrar los productos" });
  }
};

export const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ mensaje: "El producto no existe." });
    } else {
      res.status(200).json(producto);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar obtener el producto." });
  }
};
