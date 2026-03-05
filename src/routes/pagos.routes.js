import { Router } from "express";
import { crearOrdenCarrito } from "../controllers/pagos.controller.js";

const router = Router();
router.post("/crear-orden-carrito", crearOrdenCarrito);

export default router;
