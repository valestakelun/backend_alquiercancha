import mongoose from "mongoose";

// ✅ Modelo Usuario (admin y user usan el mismo login)
const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      minlength: 2,
      maxlength: 60,
      trim: true, // ✅ elimina espacios adelante y atrás
    },

    email: {
      type: String,
      unique: true,
      required: [true, "El correo electrónico es obligatorio"],
      trim: true, // ✅ elimina espacios
      lowercase: true, // ✅ guarda siempre en minúsculas
      match: [/\S+@\S+\.\S+/, "Email incorrecto"], // ✅ valida formato básico
    },

    // ⚠️ Acá se guarda el HASH de la contraseña
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("usuario", usuarioSchema);