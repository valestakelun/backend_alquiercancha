import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario", // Debe coincidir con el nombre de tu modelo de Usuarios
      required: [true, "La reserva debe pertenecer a un usuario"],
    },
    cancha: {
      type: String,
      required: [
        true,
        "Debe especificar la cancha (ej: Cancha 1, Sintético, etc.)",
      ],
      enum: ["Fútbol 5", "Fútbol 7", "Fútbol 11"], // Puedes ajustar esto a las canchas de tu complejo
    },
    fecha: {
      type: Date,
      required: [true, "La fecha es obligatoria"],
    },
    hora: {
      type: String,
      required: [true, "La hora es obligatoria"],
      match: [/^([01]\d|2[0-3]):?([0-5]\d)$/, "Formato de hora inválido "],
    },

    estado: {
      type: String,
      enum: ["pendiente", "confirmada"],
      default: "pendiente",
    },
    precio: {
      type: Number,
      required: true,
      min: 40000,
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