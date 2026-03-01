import { Router } from "express";
import { registro, login } from "../controllers/usuarios.controllers.js";
import { validacionesLogin } from "../middlewares/validacionesLogin.js";
import { validacionesRegistro } from "../middlewares/validacionesRegistro.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import verificarJWT from "../middlewares/verificarJWT.js";
import verificarAdmin from "../middlewares/verificarAdmin.js";
import { listarUsuarios } from "../controllers/usuarios.controllers.js";
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

// ✅ GET /api/usuarios (solo admin)
router.get("/", verificarJWT, verificarAdmin, listarUsuarios);

export default router;