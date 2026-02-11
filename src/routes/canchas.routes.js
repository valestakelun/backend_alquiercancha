import { Router } from "express";
import { crearCancha } from "../controllers/canchas.controllers.js";

const router = Router();

router.route("/").post(crearCancha);
export default router;
