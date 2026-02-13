import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    descripcion: {
      type: String,
      trim: true,
    },

    precio: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    categoria: {
      type: String,
      enum: ["ropa", "calzado", "accesorios", "equipamiento"],
      required: true,
    },

    subcategoria: {
      type: String,
      required: true,
    },

    marca: {
      type: String,
      trim: true,
    },

    talles: [String],
    numeros: [String],

    imagen: {
      type: String,
      default:
        "https://placehold.co/600x600/1B5E20/FFFFFF?text=Cargar+imagen+soyjoni",
    },

    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Producto", productoSchema);
