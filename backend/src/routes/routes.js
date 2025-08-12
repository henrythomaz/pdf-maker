import { Router } from "express";
import ContractController from "../app/controllers/contractController.js";

const router = Router();

// Rotas diretas sem wrappers desnecessários
router.get("/gerar-contrato", ContractController.index);
router.post("/gerar-contrato", ContractController.store);
router.get("/health", (_, res) => res.status(200).send("OK"));

export default router;