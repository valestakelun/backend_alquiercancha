import jwt from "jsonwebtoken";

// ✅ genera un token con payload (ej: { id, role })
const generarJWT = (payload) => {
  try {
    return jwt.sign(payload, process.env.SECRETJWT, { expiresIn: "2h" });
  } catch (error) {
    console.error(error);
    throw new Error("Error al generar el token");
  }
};

export default generarJWT;