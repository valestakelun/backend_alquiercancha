import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validarReserva = [
  body("usuario")
    .notEmpty()
    .withMessage("El ID del usuario es obligatorio")
    .isMongoId()
    .withMessage("El ID de usuario no es válido"),

  body("cancha")
    .notEmpty()
    .withMessage("Debe especificar la cancha")
    .isIn(["Fútbol 5", "Fútbol 7", "Fútbol 11"])
    .withMessage("La cancha seleccionada no es válida"),

  body("fecha")
    .notEmpty()
    .withMessage("La fecha es obligatoria")
    .isISO8601()
    .withMessage("Debe ingresar una fecha válida (AAAA-MM-DD)"),

  body("hora")
    .notEmpty()
    .withMessage("La hora es obligatoria")

    .matches(/^(0[9]|1\d|2[0-3]):[0-5]\d$|^(0[0-2]):[0-5]\d$/)
    .withMessage("El horario debe estar entre las 09:00 y las 02:00 am"),

  body("precio")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isInt()
    .withMessage("El precio debe ser un número")
    /* Validación personalizada para los precios fijos según la cancha */
    .custom((value, { req }) => {
      const preciosValidos = {
        "Fútbol 5": 50000,
        "Fútbol 7": 120000,
        "Fútbol 11": 200000,
      };
      const canchaSeleccionada = req.body.cancha;

      if (value !== preciosValidos[canchaSeleccionada]) {
        throw new Error(
          `El precio para ${canchaSeleccionada} debe ser $${preciosValidos[canchaSeleccionada]}`,
        );
      }
      return true;
    }),

  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validarReserva;
