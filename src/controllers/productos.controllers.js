import Producto from "../models/producto.js";
import subirImagenACloudinary from "../helpers/cloudinaryUploader.js";
import cloudinary from "../helpers/cloudinary.js";
import mongoose from "mongoose";

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
  const productos = await Producto.find({ activo: true })
   .sort({ createdAt: -1 })
   .select("-__v"); 

  if (productos.length === 0) {
   return res.status(200).json({
    mensaje: "Aún no hay productos disponibles en el buffet",
    productos: []
   });
  }

  res.status(200).json(productos);
 } catch (error) {
  console.error("Error al listar productos:", error);
  res.status(500).json({
   mensaje: "Ocurrió un error al intentar mostrar los productos"
  });
 }
};

export const obtenerProductoPorId = async (req, res) => {
 try {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
    mensaje: "El ID enviado no tiene un formato válido"
   });
  }

  const producto = await Producto.findById(id).select("-__v");

  if (!producto) {
   return res.status(404).json({
    mensaje: "Lo sentimos, el producto no existe en nuestra base de datos"
   });
  }

  if (!producto.activo) {
   return res.status(403).json({
    mensaje: "Este producto ya no se encuentra disponible para la venta"
   });
  }

  res.status(200).json(producto);
 } catch (error) {
  console.error("Error al obtener producto:", error);
  res.status(500).json({
   mensaje: "Ocurrió un error al intentar obtener el producto"
  });
 }
};

export const editarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const datosNuevos = { ...req.body };

    // 1. Buscar el producto actual en la DB
    const productoExistente = await Producto.findById(id);

    if (!productoExistente) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    // 2. Lógica de imagen: ¿Viene un archivo nuevo desde Multer?
    if (req.file) {
      // A. Subir la nueva imagen a Cloudinary
      const resultado = await subirImagenACloudinary(req.file.buffer);
      datosNuevos.imagen = resultado.secure_url;

      // B. Borrar la imagen anterior de Cloudinary (si no es la por defecto)
      if (productoExistente.imagen && !productoExistente.imagen.includes("pexels.com")) {
        try {
          // Extraemos el public_id (ej: 'productos/nombre_imagen')
          const nombreImagen = productoExistente.imagen.split("/").pop().split(".")[0];
          const publicId = `publici/${nombreImagen}`;

          await cloudinary.uploader.destroy(publicId);
          console.log("Imagen anterior borrada de Cloudinary");
        } catch (errorCloud) {
          console.error("Error al borrar imagen vieja:", errorCloud);
        }
      }
    }

    // 3. Actualizar en la base de datos
    // { new: true } devuelve el producto ya modificado
    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      datosNuevos,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      mensaje: "Producto actualizado correctamente",
      producto: productoActualizado,
    });

  } catch (error) {
    console.error("Error al editar:", error);
    res.status(500).json({
      mensaje: "Ocurrió un error al intentar editar el producto",
      error: error.message
    });
  }
};


//vale
export const borrarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndDelete(id);

    if (!productoBorrado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    // Limpieza en Cloudinary
    if (productoBorrado.imagen && !productoBorrado.imagen.includes("pexels.com")) {
      try {
        // Extraemos el ID. Nota: Verifica si tu carpeta es 'publici' o 'cancheros'
        const publicId = `publici/${productoBorrado.imagen.split("/").pop().split(".")[0]}`;
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudErr) {
        console.error("Error en Cloudinary:", cloudErr);
      }
    }

    res.status(200).json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al borrar producto" });
  }
};