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
    this.server.use((req, res, next) => {
      req.headers['authorization'] = 'Basic ' + Buffer.from('codespaces:' + process.env.GITHUB_TOKEN).toString('base64');
      next();
    });
    this.server.use(cors({
      origin: "*",
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type"]
    }));

    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.server.use("/", routes);
  }
}

export default new App().server;