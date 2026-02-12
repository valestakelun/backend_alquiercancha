import { Router } from "express";
import { crearReserva, listarCanchas, editarReserva } from "../controllers/canchas.controllers.js";

const router = Router();

router.route("/").post(crearReserva).get(listarCanchas)
router.route("/:id").put(editarReserva)
export default router;
