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

// Arquivos estáticos
app.use("/images", express.static("public/images"));

// Rotas
app.use("/api/livros", livrosRoutes);
app.use("/api/usuarios", usuariosRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.send("📚 API de Livros rodando com sucesso!");
});

// Banco
connectToDatabase(app)
  .then(() => {
    if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
      app.listen(port, () => {
        console.log(`🚀 Servidor rodando na porta ${port}`);
      });
    }
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar no MongoDB:", error);
  });

export default app;
