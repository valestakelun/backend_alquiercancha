import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";

// ✅ LOGIN ÚNICO para admin y user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // ✅ validación mínima
    if (!email || !password) {
      return res
        .status(400)
        .json({ mensaje: "Email y password son obligatorios" });
    }

    const usuario = await Usuario.findOne({ email });

    // ✅ mensaje genérico (seguridad)
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (!usuario.active) {
      return res
        .status(403)
        .json({ mensaje: "Debes verificar tu cuenta antes de iniciar sesión" });
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

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find()
      .select("nombre email role active createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al listar usuarios" });
  }
};

export const cambiarEstadoUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    usuario.active = Boolean(active);
    await usuario.save();

    return res.status(200).json({
      mensaje: "Estado actualizado correctamente",
      usuario,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al cambiar estado" });
  }
};

export const cambiarRolUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ mensaje: "Rol inválido" });
    }

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    usuario.role = role;
    await usuario.save();

    return res.status(200).json({
      mensaje: "Rol actualizado correctamente",
      usuario,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al cambiar rol" });
  }
};