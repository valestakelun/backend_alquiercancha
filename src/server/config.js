import express from "express";
import cors from "cors";
import morgan from "morgan";

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.middlewares();
  }

  middlewares() {
    
    this.app.use(cors()); 
    this.app.use(express.json()); 
    this.app.use(morgan("dev")); 
    
  }

  listen() {
    this.app.listen(this.port, () =>
      console.info(`El servidor se esta ejecutando en el puerto: ${this.port}`)
    );
  }
}