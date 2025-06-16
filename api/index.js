import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerFile = require("./swagger.json");

import { connectToDatabase } from "./config/db.js";
import livrosRoutes from "./routes/livros.js";
import usuariosRoutes from "./routes/usuarios.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Arquivos estáticos (se necessário)
app.use("/images", express.static("public/images"));
app.use(express.static("public"));

// Rotas
app.use("/api/livros", livrosRoutes);
app.use("/api/usuarios", usuariosRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.send("📚 API de Livros rodando com sucesso!");
});

// Conexão com o banco
async function startServer() {
  await connectToDatabase(app);
}

// Executa localmente
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  startServer().then(() => {
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
    });
  });
}

// Handler para Vercel (serverless)
export default async function handler(req, res) {
  if (!app.locals.db) {
    await startServer();
  }
  app(req, res);
}
