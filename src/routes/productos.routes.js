import { Router } from "express";
import {
  crearProducto
} from "../controllers/productos.controllers.js";


const router = Router();

router.post("/", crearProducto);


export default router;

