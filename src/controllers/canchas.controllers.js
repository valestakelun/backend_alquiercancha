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
      .json({ mensaje: "Ocurrio un error al intentar crear una reserva",error: error.message });
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
 //buscar canchas por id
export const obtenerCanchaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findById(id);
    if (!reserva) {
      return res.status(404).json({ mensaje: "La reserva no existe" });
    } else {
      res.status(200).json(reserva);
    }         
  } catch (error) {
    console.error(error);
    res     .status(500)
      .json({ mensaje: "Ocurrio un error al intentar listar la reserva" });
  }
};        