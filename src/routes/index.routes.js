import { Router } from "express";
import usuariosRouter from "./usuarios.routes.js";

const router = Router();

// ✅ /api/usuarios/...
router.use("/usuarios", usuariosRouter);

export default router;