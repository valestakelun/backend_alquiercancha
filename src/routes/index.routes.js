import { Router } from "express";
import canchasRoutes from "./canchas.routes";

const router = Router();
http://localhost:3000/api/canchas
router.use('/canchas', canchasRoutes)

export default router;