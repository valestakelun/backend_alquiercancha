import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export const crearOrdenCarrito = async (req, res) => {
  try {
    const { productosCarrito } = req.body;

    const items = (productosCarrito || []).map((p) => ({
      title: `Producto ${p.id}`,
      quantity: Number(p.quantity),
      currency_id: "ARS",
      unit_price: Number(p.precio || 1),
    }));

    const preferenceClient = new Preference(client);
    const preference = await preferenceClient.create({
      body: {
        items,
        back_urls: {
          success: process.env.FRONT_URL || process.env.FRONTEND_URL,
          failure: process.env.FRONT_URL || process.env.FRONTEND_URL,
          pending: process.env.FRONT_URL || process.env.FRONTEND_URL,
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
