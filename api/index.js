import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db.js";
import livrosRoutes from "./routes/livros.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve imagens da pasta public/images
app.use("/images", express.static("public/images"));

// Rotas principais
app.use("/api/livros", livrosRoutes);

// Teste de rota
app.get("/api/teste", (req, res) => {
  res.json({ status: "ok" });
});

// Rota raiz
app.get("/", (req, res) => res.send("📚 API de Livros"));

// Função de inicialização (local)
const startServer = async () => {
  await connectToDatabase(app);

  if (process.env.NODE_ENV !== "production") {
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
    });
  }
};

startServer();

// ⚠️ Exporta para funcionar na Vercel (em serverless)
export default async function handler(req, res) {
  if (!app.locals.db) {
    await connectToDatabase(app);
  }
  return app(req, res); // Proxy para o Express
}
