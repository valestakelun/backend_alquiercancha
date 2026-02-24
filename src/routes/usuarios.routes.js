import { Router } from "express";
import { registro, login } from "../controllers/usuarios.controllers.js";
import { validacionesLogin } from "../middlewares/validacionesLogin.js";
import { validacionesRegistro } from "../middlewares/validacionesRegistro.js";
import { validarCampos } from "../middlewares/validarCampos.js";
const router = Router();

// ✅ POST /api/usuarios/login
router.post(
  "/login",
  validacionesLogin,
  validarCampos,
  login
);

// Registro
router.post(
  "/registro",
  validacionesRegistro,
  validarCampos,
  registro
);

export default router;