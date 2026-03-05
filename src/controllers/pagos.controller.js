import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export const crearOrdenCarrito = async (req, res) => {
  try {
    const accessToken =
      process.env.MP_ACCESS_TOKEN || process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      return res.status(500).json({
        mensaje: "Falta configurar MP_ACCESS_TOKEN en el servidor",
      });
    }

    const { productosCarrito } = req.body;
    if (!Array.isArray(productosCarrito) || productosCarrito.length === 0) {
      return res.status(400).json({
        mensaje: "productosCarrito es requerido y debe ser un array con items",
      });
    }

    const items = productosCarrito.map((p) => ({
      title: `Producto ${p.id}`,
      quantity: Number(p.quantity || 1),
      currency_id: "ARS",
      unit_price: Number(p.precio || 1),
    })).filter((item) => Number.isFinite(item.unit_price) && item.unit_price > 0);

    if (items.length === 0) {
      return res.status(400).json({
        mensaje: "No hay items validos para crear la orden",
      });
    }

    const frontUrl = process.env.FRONT_URL || process.env.FRONTEND_URL;
    if (!frontUrl) {
      return res.status(500).json({
        mensaje: "Falta configurar FRONT_URL o FRONTEND_URL en el servidor",
      });
    }

    const preferenceClient = new Preference(client);
    const preference = await preferenceClient.create({
      body: {
        items,
        back_urls: {
          success: frontUrl,
          failure: frontUrl,
          pending: frontUrl,
        },
        auto_return: "approved",
      },
    });

    return res.status(201).json({
      init_point: preference.init_point,
      sandbox_init_point: preference.sandbox_init_point,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error creando orden",
      error: error.message,
    });
  }
};
