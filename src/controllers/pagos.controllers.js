import client from "../helpers/mercadopago.js";
import { Preference, Payment } from "mercadopago";
import Producto from "../models/producto.js";
import Pedido from "../models/pedido.js";


export const crearCarrito = async (req, res) => {
  try {
    

    const { productosCarrito } = req.body; // Ej: [{ id: '...', quantity: 2 }, { id: '...', quantity: 1 }]

    if (!productosCarrito || productosCarrito.length === 0) {
      return res.status(400).json({ mensaje: "El carrito está vacío" });
    }


    const idsProductos = productosCarrito.map(p => p.id); //['665b9f1b1234567890abcdef','665ba0c49876543210fedcba',..]
    const productosDB = await Producto.find({ _id: { $in: idsProductos } }); //$in buscar varios elementos a la vez cuando tenemos una lista de identificadores.

    const productosMap = new Map(productosDB.map(p => [p._id.toString(), p]));  //Un Map es una coleccion [clave,valor]

    let totalPedido = 0;
    const itemsParaMP = [];
     const productosDelPedido = [];


    for (const itemCarrito of productosCarrito) {
      const productoDB = productosMap.get(itemCarrito.id);
      if (productoDB) {
        // Validar que la cantidad solicitada no exceda el stock (si tuvieras stock)
        itemsParaMP.push({
          title: productoDB.nombreProducto,
          quantity: itemCarrito.quantity,
          currency_id: "ARS",
          unit_price: productoDB.precio, // Usamos el precio de la BD, no del cliente
        });
        productosDelPedido.push({
          producto: productoDB._id,
          cantidad: itemCarrito.quantity,
        });
        totalPedido += productoDB.precio * itemCarrito.quantity;
      }
    }

    if (itemsParaMP.length === 0) {
        return res.status(404).json({ mensaje: "Ninguno de los productos del carrito fue encontrado." });
    }

    const nuevoPedido = new Pedido({
      productos: productosDelPedido,
      total: totalPedido,
      estado: "Pendiente", // El estado inicial es pendiente
    });
    await nuevoPedido.save();


    const preference = {
      items: itemsParaMP,
      back_urls: {

        success: `${process.env.FRONTEND_URL || 'https://localhost:5173'}/pago/exitoso`,
      },

      external_reference: nuevoPedido._id.toString(),
    };

    const preferenceClient = new Preference(client);
    const respuesta = await preferenceClient.create({ body: preference });

   res.status(201).json({
      init_point: respuesta.init_point,
    });

  } catch (error) {
    console.error("Error al crear la orden de pago del carrito:", error);
    res.status(500).json({
      mensaje: "Ocurrió un error al procesar el pago del carrito",
      error: error.message,
    });
  }
};


export const recibirWebhook = async (req, res) => {

  const notification = req.body;
  console.log("Webhook recibido:", notification);

  try {
    if (notification.type === "payment") {
      // Usamos el ID de la notificación para obtener los detalles completos del pago.
      const paymentClient = new Payment(client);
      const payment = await paymentClient.get({ id: notification.data.id });


      if (payment && payment.status === "approved") {
        console.log("Pago aprobado. ID:", payment.id);


        const pedidoId = payment.external_reference;


        const pedido = await Pedido.findById(pedidoId);

        if (!pedido) {
          console.error(`Pedido con ID ${pedidoId} no encontrado. Este webhook podría ser de un flujo de pago antiguo o inválido.`);
          return res.sendStatus(404); // Not found
        }


        if (pedido.estado === "Pendiente") {
          pedido.estado = "Aprobado";
          pedido.paymentId = payment.id; // Guardamos el ID del pago de Mercado Pago
          await pedido.save();
          console.log(`Pedido ${pedidoId} actualizado a Aprobado.`);
        } else {
          // Si el pedido no está pendiente (ej. ya está "Aprobado"), es una notificación duplicada.
          console.log(`El pedido ${pedidoId} ya fue procesado. Estado actual: ${pedido.estado}`);
        }

        // PASOS SIGUIENTES (para una aplicación real):
        // 1. Descontar el stock del producto.
        // 2. Enviar un email de confirmación al cliente.
        // 3. Notificar al administrador de la tienda.
      }
    }

    res.sendStatus(200);
  } catch (error) {

    console.error(`Error al procesar el webhook para el pago con ID: ${notification?.data?.id}`, error);

    res.status(500).json({ mensaje: "Error interno del servidor al procesar el webhook" });
  }
};