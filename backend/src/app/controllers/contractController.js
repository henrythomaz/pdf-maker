import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Corrigir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Caminho absoluto para o content.json
const contentPath = path.join(__dirname, "../../content/content.json");

class contractController
{
  index(req, res) {
    try {
      const rawData = fs.readFileSync(contentPath, "utf-8");
      const content = JSON.parse(rawData);

      return res.status(200).json(content);
    } catch (err) {
      console.error("Erro ao ler content.json:", err);
      return res.status(500).json({ error: "Erro ao ler o contrato." });
    }
  }
  store(req, res) {
    try {
      const dados = req.body;
      fs.writeFileSync(contentPath, JSON.stringify(dados, null, 2), 'utf-8');
      return res.status(201).json({ message: "contrato salvo com sucesso!" })
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao salvar o contrato." });
    }
  }
}

export default new contractController();
