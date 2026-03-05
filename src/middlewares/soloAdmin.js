import Usuario from "../models/Usuario.js";

const soloAdmin = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.idUsuario);

    if (!usuario) {
      return res.status(401).json({ mensaje: "Usuario no válido" });
    }

    if (usuario.role !== "admin") {
      return res.status(403).json({ mensaje: "Acceso denegado: solo admin" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al validar permisos" });
  }
};

export default soloAdmin;