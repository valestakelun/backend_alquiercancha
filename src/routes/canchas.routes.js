import { Router } from "express";
import { crearReserva, listarCanchas } from "../controllers/canchas.controllers.js";

const router = Router();

router.route("/").post(crearReserva).get(listarCanchas)
export default router;
