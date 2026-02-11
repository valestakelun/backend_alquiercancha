import { Router } from "express";
import canchasroutes from "./canchas.routes.js"

const router = Router()
router.use('/canchas', canchasroutes)



export default router;