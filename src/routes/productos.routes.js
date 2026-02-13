import { Router } from "express";
import {
  crearProducto
} from "../controllers/productos.controller.js";


const router = Router();

router.post("/", crearProducto);


export default router;

