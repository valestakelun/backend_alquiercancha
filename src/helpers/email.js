import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const enviarEmailVerificacion = async (email, token) => {
  const url = `${process.env.BACKEND_URL}/api/usuarios/verificar/${token}`;

  await transporter.sendMail({
    from: `"Alquiler Cancha" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verificá tu cuenta",
    html: `
      <h2>Verificación de cuenta</h2>
      <p>Hacé click en el siguiente enlace para verificar tu cuenta:</p>
      <a href="${url}">${url}</a>
    `,
  });
};

export default transporter;