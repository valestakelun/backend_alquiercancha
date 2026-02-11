import { Router } from "express"; 
import { listarCanchas } from "../controllers/canchas.controllers.js"; 

const router = Router();

router.route("/canchas").get(listarCanchas);

export default router;