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

// Documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Arquivos estáticos (para imagens ou front-end)
app.use("/images", express.static("public/images"));
app.use(express.static("public"));

// Rotas da API
app.use("/api/livros", livrosRoutes);
app.use("/api/usuarios", usuariosRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.send("📚 API de Livros rodando com sucesso!");
});

// Conexão com o banco
connectToDatabase(app);

// 🚀 Executa localmente (ignora em produção e em testes)
if (process.env.NODE_ENV !== "production" && !process.env.JEST_WORKER_ID) {
  app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
  });
}

// 🧪 Exporta para testes e Vercel
const handler = async (req, res) => {
  if (!app.locals.db) {
    await connectToDatabase(app);
  }
  return app(req, res);
};

export { handler };
export default app;
