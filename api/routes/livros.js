import express from "express";
import {
  getLivros,
  getLivroById,
  createLivro,
  updateLivro,
  deleteLivro,
<<<<<<< HEAD
  consultaAvancada,
  buscarLivroGoogle,
  getLivrosDestaque
=======
  consultaAvancada
>>>>>>> 52f406d6d33db186175d4e07b743ef8226baf4bb
} from "../controllers/livros.js";

import { validarLivro, tratarErros } from "../middleware/validation.js";
import auth from "../middleware/auth.js";

const router = express.Router();

<<<<<<< HEAD
// Lista livros em destaque
router.get('/destaques', auth, getLivrosDestaque);

// Busca na API do Google Books
router.get('/busca/google/:titulo', auth, buscarLivroGoogle);

// Busca avançada (com filtros por avaliação mínima/máxima)
router.get('/busca/avancada', auth, consultaAvancada);

// Lista todos os livros com paginação, ordenação e filtros
router.get('/', auth, getLivros);

// Busca livro específico por ID
router.get('/:id', auth, getLivroById);

// Cadastra novo livro
router.post('/', auth, validarLivro, tratarErros, createLivro);

// Atualiza livro existente
router.put('/:id', auth, validarLivro, tratarErros, updateLivro);

// Remove livro
router.delete('/:id', auth, deleteLivro);
=======
// Listagem com filtros, ordenação e paginação
router.get("/", getLivros);

// Rota de consulta avançada (deve vir antes da rota com ":id")
router.get("/consulta-avancada", consultaAvancada);

// CRUD de livros
router.get("/:id", getLivroById);
router.post("/", validarLivro, tratarErros, createLivro);
router.put("/:id", validarLivro, tratarErros, updateLivro);
router.delete("/:id", deleteLivro);
>>>>>>> 52f406d6d33db186175d4e07b743ef8226baf4bb

export default router;