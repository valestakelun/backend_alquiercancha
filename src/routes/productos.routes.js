import { Router } from "express";
import {
  crearProducto
} from "../controllers/productos.controlles.js";
import upload from "../helpers/upload.js"; 
import errorMulter from "../middlewares/errorMulter.js";


const router = Router();

router.post("/", upload.single("imagen"), errorMulter, crearProducto);


export default router;

