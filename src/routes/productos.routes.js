import { Router } from "express";
import {
  crearProducto,
  listarProductos
} from "../controllers/productos.controllers.js";


const router = Router();

router.post("/", crearProducto).get(listarProductos);


export default router;

