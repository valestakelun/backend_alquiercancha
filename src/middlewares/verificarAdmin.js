const verificarAdmin = (req, res, next) => {
  try {
    //  verificarJWT ya deja el payload en req.idUsuario
    // Pero para validar admin necesitamos el role.
    // En  generarJWT firmo { id, role }, así que lo ideal es guardar también role en req.

    if (req.role !== "admin") {
      return res.status(403).json({ mensaje: "Acceso denegado: solo admin" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al validar rol de admin" });
  }
};

export default verificarAdmin;