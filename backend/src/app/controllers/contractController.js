import fs from "fs/promises"; // Usando versão promise-based
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentPath = path.join(__dirname, "../../content/content.json");

class ContractController {
  static async #handleFileOperations() {
    try {
      await fs.access(contentPath); // Verifica se arquivo existe
      const rawData = await fs.readFile(contentPath, "utf-8");
      return JSON.parse(rawData);
    } catch (error) {
      console.error("Erro nas operações de arquivo:", error);
      throw error;
    }
  }

  static async index(req, res) {
    try {
      const content = await this.#handleFileOperations();
      return res.status(200).json(content);
    } catch (error) {
      return error.code === 'ENOENT'
        ? res.status(404).json({ error: "Arquivo não encontrado" })
        : res.status(500).json({ error: "Erro ao ler o contrato" });
    }
  }

  static async store(req, res) {
    try {
      if (!req.body || !Object.keys(req.body).length) {
        return res.status(400).json({ error: "Dados não fornecidos" });
      }

      await fs.writeFile(contentPath, JSON.stringify(req.body, null, 2));
      
      // Simulação de PDF - implemente sua lógica real aqui
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=contrato.pdf');
      return res.send(Buffer.from("CONTRATO GERADO COM SUCESSO"));
    } catch (error) {
      console.error("Erro ao salvar contrato:", error);
      return res.status(500).json({ error: "Erro ao salvar o contrato" });
    }
  }
}

export default ContractController;