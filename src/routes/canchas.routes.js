import { Router } from "express";

import { crearReserva, listarCanchas, obtenerCanchaPorId, editarReserva} from "../controllers/canchas.controllers.js";

const router = Router();

router.route("/").post(crearReserva).get(listarCanchas)

router.route("/:id").get(obtenerCanchaPorId).put(editarReserva)
export default router;
