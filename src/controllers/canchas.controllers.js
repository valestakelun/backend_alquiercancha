import Reserva from "../models/cancha.js";

export const crearReserva = async (req, res) => {
  try {
    const { cancha, fecha, hora, precio, estado } = req.body;

    const reservaExistente = await Reserva.findOne({
      cancha,
      fecha,
      hora,
    });

    if (reservaExistente) {
      return res.status(400).json({
        mensaje:
          "Lo sentimos, esta cancha ya está reservada para ese día y horario. ¡Probá con otro turno!",
      });
    }

    const reservaNuevo = new Reserva({
      cancha,
      fecha,
      hora,
      precio,
      estado: estado || "pendiente",
      usuario: req.idUsuario,
    });

    await reservaNuevo.save();

    const reservaCreada = await Reserva.findById(reservaNuevo._id).populate(
      "usuario",
      "nombre email"
    );

    res.status(201).json(reservaCreada);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Ocurrió un error al intentar crear una reserva",
      error: error.message,
    });
  }
};
export const listarCanchas = async (req, res) => {
  try {
   const reservas = await Reserva.find()
  .populate("usuario", "nombre email")
  .sort({ fecha: 1, hora: 1 });

    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar listar las reservas" });
  }
};

export const editarReserva = async (req, res) => {
  try {
    const reservaBuscada = await Reserva.findById(req.params.id);
    if (!reservaBuscada) {
      return res
        .status(404)
        .json({ mensaje: "No se encontro la reserva con el ID enviado" });
    }
    await Reserva.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json({ mensaje: "Se actualizo la reserva correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Ocurrio un error al intentar editar una reserva",
    });
  }
};

export const borrarReserva = async (req, res) => {
  try {
    const reservaBorrada = await Reserva.findByIdAndDelete(req.params.id);
    if (!reservaBorrada) {
      return res
        .status(404)
        .json({ mensaje: "No se encontro la reserva con el ID enviado" });
    }

    res.status(200).json({ mensaje: "La reserva fue borrada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Ocurrio un error al intentar borrar una reserva",
    });
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
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar listar la reserva" });
  }
};
