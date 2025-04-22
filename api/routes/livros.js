import express from "express";
import {
  getLivros,
  getLivroById,
  createLivro,
  updateLivro,
  deleteLivro,
  consultaAvancada
} from "../controllers/livros.js";

import { validarLivro, tratarErros } from "../middleware/validation.js";

const router = express.Router();

// Listagem com filtros, ordenação e paginação
router.get("/", getLivros);

// Rota de consulta avançada (deve vir antes da rota com ":id")
router.get("/consulta-avancada", consultaAvancada);

// CRUD de livros
router.get("/:id", getLivroById);
router.post("/", validarLivro, tratarErros, createLivro);
router.put("/:id", validarLivro, tratarErros, updateLivro);
router.delete("/:id", deleteLivro);

export default router;