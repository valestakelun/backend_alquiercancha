import { Router } from "express"
import { crearCarrito, recibirWebhook } from "../controllers/pagos.controllers.js";

const router = Router();
//http://localhost:3000/api/pagos/orden-carrito
router.route('/orden-carrito').post(crearCarrito)
router.route('/webhook').post(recibirWebhook)

export default router;