import fs from "fs"
import path from "path"
import app from "./app.js";
import dotenv from "dotenv";

const contentPath = path.join(__dirname, 'content.json');

if (!fs.existsSync(contentPath)) {
  fs.writeFileSync(contentPath, JSON.stringify({}, null, 2), 'utf-8');
  console.log('Arquivo content.json criado com sucesso!');
} else {
  console.log('Arquivo content.json já existe.');
}

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Rodando na porta: ", PORT)
});