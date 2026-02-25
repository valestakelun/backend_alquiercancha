import { Router } from "express";

import {
  crearProducto,
  listarProductos,
  obtenerProductoPorId,
  borrarProducto,
  editarProducto,
} from "../controllers/productos.controllers.js";
import validarProducto from "../middlewares/validarProducto.js";
import validarIdProducto from "../middlewares/validarIdProducto.js";
import upload from "../helpers/upload.js";
import errorMulter from "../middlewares/errorMulter.js";

const router = Router();

router
  .route("/")
  .post([upload.single("imagen"), errorMulter, validarProducto], crearProducto)
  .get(listarProductos);

router
  .route("/:id")
  .get([validarIdProducto], obtenerProductoPorId)
  .put([validarIdProducto, validarProducto], editarProducto)
  .delete([validarIdProducto], borrarProducto);

export default router;
