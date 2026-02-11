export const listarCanchas = (req, res) => {
  console.log("Prueba Ruta de canchas");
  res.send("✅ Ruta de canchas funcionando!");
};

export const getCanchaById = (req, res) => {
  res.send("Cancha por ID");
};

