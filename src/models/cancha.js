import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usuario", 
      required: [true, "La reserva debe pertenecer a un usuario"],
    },
    cancha: {
      type: String,
      required: [
        true,
        "Debe especificar la cancha (ej: Cancha 1, Sintético, etc.)",
      ],
      enum: ["Fútbol 5", "Fútbol 7", "Fútbol 11"], 
    },
    fecha: {
      type: String,
      required: [true, "La fecha es obligatoria"],
    },
    hora: {
      type: String,
      required: [true, "La hora es obligatoria"],
      
      match: [
        /^(0[9]|1\d|2[0-3]):[0-5]\d$|^(0[0-2]):[0-5]\d$/,
        "El horario debe estar entre las 09:00 y las 02:00 am"
      ],
    },

    estado: {
      type: String,
      enum: ["pendiente", "confirmada"],
      default: "pendiente",
    },
    precio: {
      type: Number,
      required: true,
      min: 50000,
      max: 200000,
    },
  },
  {
    timestamps: true, // Crea automáticamente campos de fecha de creación y actualización
  },
);

// Índice compuesto para evitar que se reserve la misma cancha a la misma hora el mismo día
reservaSchema.index({ cancha: 1, fecha: 1, hora: 1 }, { unique: true });

const Reserva = mongoose.model("Reserva", reservaSchema);

export default Reserva;
