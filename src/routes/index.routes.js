import { Router } from "express";
import usuariosRouter from "./usuarios.routes.js";
import canchasroutes from "./canchas.routes.js";
import productosRouter from "./productos.routes.js";
import pagosRouter from "./pagos.routes.js";

const router = Router();

// ✅ /api/usuarios/...
router.use("/usuarios", usuariosRouter);

// ✅ /api/canchas/...
router.use("/canchas", canchasroutes);

// ✅ /api/productos/...
router.use("/productos", productosRouter);

router.use("/pagos",pagosRouter)

export default router;