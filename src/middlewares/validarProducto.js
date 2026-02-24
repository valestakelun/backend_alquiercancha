import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validarProducto = [
  body("nombre")
    .notEmpty().withMessage("El nombre del producto es obligatorio")
    .isLength({ min: 3, max: 100 }).withMessage("El nombre debe tener entre 3 y 100 caracteres"),

  body("descripcion")
    .optional()
    .isLength({ max: 250 }).withMessage("La descripción no puede superar los 250 caracteres"),

  body("precio")
    .notEmpty().withMessage("El precio es obligatorio")
    .isNumeric().withMessage("El precio debe ser un número")
    .custom((valor) => {
      if (valor < 20000) {
        throw new Error("El precio mínimo es de $20.000");
      }
      return true;
    }),

  body("stock")
    .optional()
    .isInt({ min: 1 }).withMessage("El stock debe ser un número entero y al menos 1"),

  body("categoria")
    .notEmpty().withMessage("La categoría es obligatoria")
    .isIn(["bebidas", "ropa", "calzado", "accesorios", "equipamiento"])
    .withMessage("Categoría no válida"),

  body("subcategoria")
    .notEmpty().withMessage("La subcategoría es obligatoria"),

  body("imagen")
    .notEmpty().withMessage("La imagen es obligatoria")
    .matches(/^https:\/\/.+\.(jpg|jpeg|png|gif|webp|bmp|svg)$/)
    .withMessage("Debe ser una URL de imagen válida (https) y terminar en formato de imagen"),

  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validarProducto;