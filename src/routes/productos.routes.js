import { Router } from "express";
import {
  crearProducto,
  listarProductos,
  obtenerProductoPorId
} from "../controllers/productos.controllers.js";


const router = Router();

router.route("/").post(crearProducto).get(listarProductos)
router.route("/:id").get(obtenerProductoPorId);


export default router;

