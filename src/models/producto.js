import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [100, "El nombre es demasiado largo"],
    },

    descripcion: {
      type: String,
      trim: true,
      maxlength: [250, "La descripción no puede superar los 250 caracteres"],
    },

    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: 20000,
    },

    stock: {
      type: Number,
      default: 0,
      min: 1,
    },

    categoria: {
      type: String,
     required: [true, "La categoría es obligatoria"],
      enum: {
        values: ["bebidas", "ropa", "calzado", "accesorios", "equipamiento"],
        message: "{VALUE} no es una categoría válida",
      },
    },

    subcategoria: {
      type: String,
      trim: true,
       required: [true, "La subcategoría es obligatoria"],
    },

    marca: {
      type: String,
      trim: true,
      default: "Genérico",
    },

    tallesDisponibles: [String],
    imagen: {
      type: String,
      default:
        "https://placehold.co/600x600/1B5E20/FFFFFF?text=Cargar+imagen+soyjoni",
      required: true,
      validate: {
        validator: (valor) => {
          return /^https:\/\/.+\.(jpg|jpeg|png|gif|webp|bmp|svg)$/.test(valor);
        },
      },
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Producto", productoSchema);
