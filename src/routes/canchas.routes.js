import { Router } from "express";
import { crearReserva, listarCanchas, obtenerCanchaPorId} from "../controllers/canchas.controllers.js";

const router = Router();

router.route("/").post(crearReserva).get(listarCanchas)
router.route("/:id").get(obtenerCanchaPorId)
export default router;
