import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.info("BD conectada correctamente"))
  .catch((error) => {
    console.error("Error conectando a MongoDB:", error.message);
  });

export default mongoose;
