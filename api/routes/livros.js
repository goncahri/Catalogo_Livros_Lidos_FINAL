import express from "express";
import {
  getLivros,
  getLivroById,
  createLivro,
  updateLivro,
  deleteLivro,
  consultaAvancada // 👈 novo import
} from "../controllers/livros.js";

import { validarLivro, tratarErros } from "../middleware/validation.js";

const router = express.Router();

// Rota com filtros, paginação, ordenação
router.get("/", getLivros);

// Nova rota com operadores avançados
router.get("/consulta-avancada", consultaAvancada);

// CRUD
router.get("/:id", getLivroById);
router.post("/", validarLivro, tratarErros, createLivro);
router.put("/:id", validarLivro, tratarErros, updateLivro);
router.delete("/:id", deleteLivro);

export default router;
