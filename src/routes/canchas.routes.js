import { Router } from "express";
<<<<<<< feature/putCanchas
import { crearReserva, listarCanchas, editarReserva } from "../controllers/canchas.controllers.js";
=======
import { crearReserva, listarCanchas, obtenerCanchaPorId} from "../controllers/canchas.controllers.js";
>>>>>>> dev

const router = Router();

router.route("/").post(crearReserva).get(listarCanchas)
<<<<<<< feature/putCanchas
router.route("/:id").put(editarReserva)
=======
router.route("/:id").get(obtenerCanchaPorId)
>>>>>>> dev
export default router;
