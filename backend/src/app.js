import cors from "cors";
import express from "express";
import routes from "./routes/routes.js";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    const corsOptions = {
      origin: "https://miniature-broccoli-pj7xvgpw775r3rjpv-5501.app.github.dev",
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type"]
    };
    
    this.server.use(cors(corsOptions));
    this.server.options("*", cors(corsOptions)); // <- importante para OPTIONS
    this.server.use(express.json());
  }

  routes() {
    this.server.use("/", routes);
  }
}

export default new App().server;
