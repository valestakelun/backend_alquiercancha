import { Router } from "express";

import {
  crearReserva,
  listarCanchas,
  obtenerCanchaPorId,
  editarReserva,
  borrarReserva,
} from "../controllers/canchas.controllers.js";
import validarReserva from "../middlewares/validacionesCanchas.js";
import validacionIdReserva from "../middlewares/validacionIdReserva.js";
import verificarJWT from "../middlewares/verificarJWT.js";

const router = Router();

router
  .route("/")
  .post([verificarJWT, validarReserva], crearReserva)
  .get(listarCanchas);

router
  .route("/:id")
  .get([verificarJWT, validacionIdReserva], obtenerCanchaPorId)
  .put([verificarJWT, validacionIdReserva, validarReserva], editarReserva)
  .delete([verificarJWT, validacionIdReserva], borrarReserva);
export default router;
