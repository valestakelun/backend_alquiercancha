import { param } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validarIdProducto = [
  param("id")
    .isMongoId()
    .withMessage("El id enviado no corresponde a un formato de MongoDB válido"),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validarIdProducto;