import Producto from "../models/producto.js";
import subirImagenACloudinary from "../helpers/cloudinaryUploader.js";


export const crearProducto = async (req, res) => {
  try {
    let imagenUrl =
      "https://images.pexels.com/photos/5652023/pexels-photo-5652023.jpeg";

    // 1. Subir a Cloudinary si existe el archivo
    if (req.file) {
      const resultado = await subirImagenACloudinary(req.file.buffer);
      imagenUrl = resultado.secure_url;
    }

    // 2. Unir la URL de la imagen con el resto de los datos
   
    const datosProducto = {
      ...req.body,
      imagen: imagenUrl,
    };

    // 3. Crear instancia con el modelo correcto (Producto)
    const productoNuevo = new Producto(datosProducto);

    await productoNuevo.save();

    res.status(201).json({
      mensaje: "El producto fue creado correctamente",
      producto: productoNuevo,
    });
  } catch (error) {
    console.error("Error detallado:", error);
    res.status(500).json({
      mensaje: "Ocurrio un error al intentar crear un producto",
      error: error.message, 
    });
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

