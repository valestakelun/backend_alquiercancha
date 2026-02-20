import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";

// ✅ LOGIN ÚNICO para admin y user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
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

export async function registro(req, res) {
  try {
    const { nombre, email, password } = req.body;

    // ✅ Validación de campos obligatorios
    if (!nombre || !email || !password) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    // ✅ Verificar si el email ya existe
    const exists = await Usuario.findOne({ email });
    if (exists) {
      return res.status(409).json({
        message: "Email ya registrado",
      });
    }

    // ✅ Hashear contraseña antes de guardarla
    const passwordHash = await bcrypt.hash(password, 10);

    // ⚠️ IMPORTANTE: el modelo usa "password"
    const user = await Usuario.create({
      nombre,
      email,
      password: passwordHash,
      role: "user",      // siempre se registra como user
      active: true,
    });

    // ✅ Respuesta exitosa
    return res.status(201).json({
      message: "Usuario creado correctamente",
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        role: user.role,
        active: user.active,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al registrar usuario",
    });
  }
}