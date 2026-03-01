import { Router } from "express";
import { registro, login } from "../controllers/usuarios.controllers.js";
import {
  listarUsuarios,
  cambiarEstadoUsuario,
  cambiarRolUsuario,
} from "../controllers/usuarios.controllers.js";
import { validacionesLogin } from "../middlewares/validacionesLogin.js";
import { validacionesRegistro } from "../middlewares/validacionesRegistro.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import verificarJWT from "../middlewares/verificarJWT.js";
import soloAdmin from "../middlewares/soloAdmin.js";

const router = Router();

// 🔐 LOGIN
router.post(
  "/login",
  validacionesLogin,
  validarCampos,
  login
);

// 📝 REGISTRO
router.post(
  "/registro",
  validacionesRegistro,
  validarCampos,
  registro
);

// SOLO ADMIN

// Listar usuarios
router.get(
  "/",
  verificarJWT,
  soloAdmin,
  listarUsuarios
);

// Cambiar estado (activar/desactivar)
router.put(
  "/:id/estado",
  verificarJWT,
  soloAdmin,
  cambiarEstadoUsuario
);

// Cambiar rol (admin/user)
router.put(
  "/:id/rol",
  verificarJWT,
  soloAdmin,
  cambiarRolUsuario
);

export default router;