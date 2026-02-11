import Reserva from "../models/cancha.js";



export const crearReserva = async (req, res) => {
  try {
    // agregar validacion de datos
    const reservaNuevo = new Reserva(req.body);
    await reservaNuevo.save();
    res.status(201).json({ mensaje: "La reserva fue creada correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar crear una reserva" });
  }
};
export const listarCanchas = async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar listar las reservas" });
  }
};
