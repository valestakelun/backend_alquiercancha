import { Router } from "express";
import canchasroutes from "./canchas.routes.js"

const router = Router()
router.use('/canchas', canchasroutes)

//http://localhost:3000/api/canchas

export default router;