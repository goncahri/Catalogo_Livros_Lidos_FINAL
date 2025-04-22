// api/middleware/validation.js
import { body, validationResult } from "express-validator";

// Validações para criação e atualização de livros
export const validarLivro = [
  body("titulo")
    .trim()
    .notEmpty().withMessage("O título é obrigatório.")
    .isLength({ min: 3 }).withMessage("O título deve ter pelo menos 3 caracteres."),
  body("autor")
    .trim()
    .notEmpty().withMessage("O autor é obrigatório.")
    .isLength({ min: 3 }).withMessage("O autor deve ter pelo menos 3 caracteres."),
  body("paginas")
    .notEmpty().withMessage("O número de páginas é obrigatório.")
    .isInt({ min: 1 }).withMessage("O número de páginas deve ser um inteiro positivo."),
  body("avaliacao")
    .notEmpty().withMessage("A avaliação é obrigatória.")
    .isFloat({ min: 0, max: 5 }).withMessage("A avaliação deve estar entre 0 e 5."),
  body("dataLeitura")
    .notEmpty().withMessage("A data da leitura é obrigatória.")
    .isISO8601().withMessage("A data da leitura deve estar em formato válido (AAAA-MM-DD).")
];

// Middleware para tratar os erros de validação
export const tratarErros = (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({
      error: true,
      erros: erros.array().map(e => ({ campo: e.param, msg: e.msg }))
    });
  }
  next();
};
