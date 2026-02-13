import { Router } from "express";
import {
  crearProducto,
  borrarProductoPorId,
} from "../controllers/productos.controller.js";


const router = Router();

router.post("/", crearProducto);
router.delete("/:id", borrarProductoPorId);

export default router;

