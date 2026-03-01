import crypto from "crypto";
import { enviarEmailVerificacion } from "../helpers/email.js";
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


    // ✅ Verificar si el email ya existe
    const exists = await Usuario.findOne({ email });
    if (exists) {
      return res.status(409).json({
        message: "Email ya registrado",
      });
    }

    // hashear contraseña antes de guardarla
    const passwordHash = await bcrypt.hash(password, 10);

    // generar token único
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await Usuario.create({
      nombre,
      email,
      password: passwordHash,
      role: "user",
      active: false, // arranca inactivo
      verificationToken,
      verificationTokenExpires: Date.now() + 1000 * 60 * 60, // 1 hora
    });

    const url = `${process.env.BACKEND_URL}/api/usuarios/verificar/${verificationToken}`;

    await enviarEmailVerificacion(email, verificationToken);

    // respuesta exitosa
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

export const verificarCuenta = async (req, res) => {
  try {
    const { token } = req.params;

    const usuario = await Usuario.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!usuario) {
      return res.status(400).json({
        message: "Token inválido o expirado",
        expired: true
      });
    }

    usuario.active = true;
    usuario.verificationToken = null;
    usuario.verificationTokenExpires = null;

    await usuario.save();

    return res.redirect(`${process.env.FRONTEND_URL}/login`);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al verificar cuenta",
    });
  }
};

export const reenviarVerificacion = async (req, res) => {
  try {
    const { email } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    if (usuario.active) {
      return res.status(400).json({
        message: "La cuenta ya está verificada",
      });
    }

    // evitar spam de reenvío
const AHORA = Date.now();
const LIMITE_REENVIO = 5 * 60 * 1000; // 5 minutos

if (usuario.verificationLastSentAt) {
  const ultimaVez = usuario.verificationLastSentAt.getTime();
  const tiempoTranscurrido = AHORA - ultimaVez;

  if (tiempoTranscurrido < LIMITE_REENVIO) {
  const tiempoRestanteMs = LIMITE_REENVIO - tiempoTranscurrido;
  const segundosRestantes = Math.ceil(tiempoRestanteMs / 1000);

    return res.status(400).json({
      message: `Podés solicitar un nuevo código en ${segundosRestantes} segundos.`,
      tiempoRestante: segundosRestantes
    });
  }
}

    // nuevo token
    const nuevoToken = crypto.randomBytes(32).toString("hex");

    usuario.verificationToken = nuevoToken;

    usuario.verificationTokenExpires = new Date(
      Date.now() + 1000 * 60 * 60 // 1 hora
    );

    usuario.verificationLastSentAt = new Date();

    await usuario.save();

    await enviarEmailVerificacion(usuario.email, nuevoToken);

    return res.json({
      message: "Se envió un nuevo correo de verificación",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al reenviar verificación",
    });
  }
};