import { Router } from "express";

import { crearReserva, listarCanchas, obtenerCanchaPorId, editarReserva, borrarReserva} from "../controllers/canchas.controllers.js";

const router = Router();

router.route("/").post(crearReserva).get(listarCanchas)

router.route("/:id").get(obtenerCanchaPorId).put(editarReserva).delete(borrarReserva)
export default router;
