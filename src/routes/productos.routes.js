import { Router } from "express";
import {
  crearProducto
} from "../controllers/productos.controlles.js";


const router = Router();

router.post("/", crearProducto);


export default router;

