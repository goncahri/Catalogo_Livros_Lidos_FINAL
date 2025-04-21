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

app.use(cors({
  origin: (origin, callback) => {
    // Permite requisições locais ou do frontend no Vercel
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Não permitido por CORS"));
    }
  }
}));


app.use(express.json());
app.use("/images", express.static("public/images"));
app.use("/api/livros", livrosRoutes);

app.get("/api/teste", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (req, res) => res.send("📚 API de Livros"));

async function startServer() {
  await connectToDatabase(app);
  app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
  });
}

// Só executa localmente
if (process.env.NODE_ENV !== "production") {
  startServer();
}

// Exporta para Vercel (serverless)
export default async function handler(req, res) {
  if (!app.locals.db) {
    await connectToDatabase(app);
  }
  return app(req, res);
}
