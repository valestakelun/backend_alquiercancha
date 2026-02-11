import { Router } from "express";
import { login } from "../controllers/usuarios.controllers.js";

const router = Router();

// ✅ POST /api/usuarios/login
router.post("/login", login);

export default router;