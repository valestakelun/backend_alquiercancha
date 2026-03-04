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
import verificarJWT from "../middlewares/verificarJWT.js";

const router = Router();

router
  .route("/")
  .post(
    [verificarJWT, upload.single("imagen"), errorMulter, validarProducto],
    crearProducto,
  )
  .get(listarProductos);

router
  .route("/:id")
  .get([verificarJWT, validarIdProducto], obtenerProductoPorId)
  .put(
  [verificarJWT, validarIdProducto, upload.single("imagen"), errorMulter, validarProducto],
  editarProducto
)
  .delete([verificarJWT, validarIdProducto], borrarProducto);

export default router;
