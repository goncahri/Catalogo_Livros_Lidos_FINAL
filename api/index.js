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

connectToDatabase(app).then(() => {
  app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
  });
});

