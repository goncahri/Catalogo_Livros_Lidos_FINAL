import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db.js";
import livrosRoutes from "./routes/livros.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  "https://front-catalogo-livros-lidos.vercel.app",
  "http://localhost:3000"
];

const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Não permitido por CORS"));
    }
  }
});

app.use(corsMiddleware);
app.use(express.json());
app.use("/images", express.static("public/images"));
app.use("/api/livros", livrosRoutes);

app.get("/api/teste", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (req, res) => res.send("📚 API de Livros"));

// Localhost
async function startServer() {
  await connectToDatabase(app);
  app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
  });
}

if (process.env.NODE_ENV !== "production") {
  startServer();
}

// Vercel (serverless)
export default async function handler(req, res) {
  if (!app.locals.db) {
    await connectToDatabase(app);
  }

  // Aplica manualmente o CORS no modo serverless
  return corsMiddleware(req, res, () => app(req, res));
}
