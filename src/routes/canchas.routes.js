import { Router } from "express";
import { crearReserva } from "../controllers/canchas.controllers.js";

const router = Router();

router.route("/").post(crearReserva)
export default router;
