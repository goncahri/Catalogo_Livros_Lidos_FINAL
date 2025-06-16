import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { connectToDatabase } from "./config/db.js";
import livrosRoutes from "./routes/livros.js";
import usuariosRoutes from "./routes/usuarios.js";

// Lê o arquivo swagger.json dinamicamente
const swaggerDocument = JSON.parse(
  fs.readFileSync("./api/swagger.json", "utf-8")
);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger funcionando local e na Vercel pela rota /api/doc
app.use(
  "/api/doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .opblock .opblock-summary-path-description-wrapper {
        justify-content: center;
        display: flex;
      }
    `
  })
);

// Arquivos estáticos (se tiver imagens, etc.)
app.use("/images", express.static("public/images"));

// Rotas principais da API
app.use("/api/livros", livrosRoutes);
app.use("/api/usuarios", usuariosRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.send("📚 API de Livros rodando com sucesso!");
});

// Conexão com banco
async function startServer() {
  if (!app.locals.db) {
    await connectToDatabase(app);
  }
}

// Execução local
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  startServer().then(() => {
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
    });
  });
}

// Handler para Vercel
export default async function handler(req, res) {
  await startServer();
  return app(req, res);
}
