import { Router } from "express";

import { crearReserva, listarCanchas, obtenerCanchaPorId, editarReserva, borrarReserva} from "../controllers/canchas.controllers.js";
import validarReserva from "../middlewares/validacionesCanchas.js";

const router = Router();

router.route("/").post([validarReserva], crearReserva).get(listarCanchas)

router.route("/:id").get(obtenerCanchaPorId).put(editarReserva).delete(borrarReserva)
export default router;
