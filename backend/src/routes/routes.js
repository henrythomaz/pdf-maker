import { Router } from "express";
import contrato from "../app/controllers/contractController.js"

const routes = new Router();

routes.get("/gerar-contrato", contrato.index);
routes.post("/gerar-contrato", contrato.store);

export default routes;