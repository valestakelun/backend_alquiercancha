import { Router } from "express";
import { login } from "../controllers/usuarios.controllers.js";
import { validacionesLogin } from "../middlewares/validacionesLogin.js";
import { validarCampos } from "../middlewares/validarCampos.js";
const router = Router();

// ✅ POST /api/usuarios/login
router.post(
  "/login",
  validacionesLogin,
  validarCampos,
  login
);
export default router;