import { param } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionIdReserva = [
  param('id').isMongoId().withMessage('El id enviado no corresponde a un mongoID valido'),
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionIdReserva;