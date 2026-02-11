import mongoose from "mongoose";

// ✅ Modelo Usuario para login único (admin y user)
const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 60,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // ✅ se guarda el HASH de la password
    password: {
      type: String,
      required: true,
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