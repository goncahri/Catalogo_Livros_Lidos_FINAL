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
app.use('/images', express.static('public/images'));

// Rotas
app.use("/api/livros", livrosRoutes);

app.get("/", (req, res) => res.send("📚 API de Livros"));

// Conecta ao banco e inicia o app
const start = async () => {
  await connectToDatabase(app);

  // Se o arquivo estiver sendo executado diretamente (ex: node index.js), inicia o servidor
  if (process.env.NODE_ENV !== "production") {
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
    });
  }
};

start();

// Exporta o app para funcionar na Vercel
export default app;


