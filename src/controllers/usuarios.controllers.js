import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";

// ✅ LOGIN ÚNICO para admin y user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
const hashedPassword = await bcrypt.hash("Admin1234$", 10)

console.log(hashedPassword)

    // ✅ validación mínima
    if (!email || !password) {
      return res.status(400).json({ mensaje: "Email y password son obligatorios" });
    }

    const usuario = await Usuario.findOne({ email });

    // ✅ mensaje genérico (seguridad)
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (!usuario.active) {
      return res.status(403).json({ mensaje: "Usuario inactivo" });
    }

    // ✅ compara password ingresada contra HASH guardado
    const ok = await bcrypt.compare(password, usuario.password);

    if (!ok) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    // ✅ token con rol (para autorización en front/back)
    const token = generarJWT({
      id: usuario._id.toString(),
      role: usuario.role,
    });

    // ✅ respuesta simple (estilo profe)
    return res.status(200).json({
      mensaje: "Login correcto",
      nombre: usuario.nombre,
      role: usuario.role,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al iniciar sesión" });
  }
};