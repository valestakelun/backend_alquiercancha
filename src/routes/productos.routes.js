import { Router } from "express";

import {
  crearProducto,
  listarProductos,
  obtenerProductoPorId,
  borrarProducto
} from "../controllers/productos.controllers.js";

import upload from "../helpers/upload.js";
import errorMulter from "../middlewares/errorMulter.js";

const router = Router();

// POST con imagen (cloudinary)
router.route("/")
  .post(upload.single("imagen"), errorMulter, crearProducto)
  .get(listarProductos);

router.route("/:id")
  .get(obtenerProductoPorId)
  .delete(borrarProducto);

export default router;
