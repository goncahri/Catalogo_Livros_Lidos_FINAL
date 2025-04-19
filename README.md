# 📚 Catálogo de Livros - API com MongoDB

Este projeto é uma API RESTful para gerenciamento de livros lidos. Utiliza **Node.js**, **Express** e **MongoDB** como base de dados. Permite **cadastrar, editar, excluir e listar livros**, com recursos de **filtro por ano**, **ordenação por avaliação**, **paginação** e destaque de livros.

---

## 📋 Índice

- [📦 Requisitos](#-requisitos)
- [🚀 Instalação](#-instalação)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔌 Endpoints da API](#-endpoints-da-api)
- [📜 Scripts](#-scripts)
- [💾 Exemplo de livro para cadastro](#-exemplo-de-livro-para-cadastro)
- [🖥️ Demo](#️-demo)
- [🤝 Contribuição](#-contribuição)
- [📝 Licença](#-licença)
- [👤 Autor](#-autor)

---

## 📦 Requisitos

- Node.js (v14 ou superior)
- MongoDB local ou na nuvem (ex: MongoDB Atlas)
- Ferramenta para testar requisições (Postman, Thunder Client, Insomnia etc.)

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo-catalogo-livros.git
cd seu-repo-catalogo-livros
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz com o seguinte conteúdo:

```env
MONGO_URI=mongodb://localhost:27017/catalogo-livros
PORT=3000
```

---

## 📂 Estrutura do Projeto

```
.
├── api/
│   ├── config/           # Conexão com MongoDB
│   ├── controllers/      # Lógica das requisições (CRUD)
│   ├── middleware/       # Validações com express-validator
│   ├── routes/           # Rotas da API
│   └── index.js          # Entrada principal da API
├── public/
│   └── images/           # Imagens dos livros (caso existam)
├── index.html            # Front-end (opcional)
├── vercel.json           # Configuração para deploy (opcional)
├── .env                  # Variáveis de ambiente
├── package.json
└── README.md
```

---

## 🔌 Endpoints da API

- `GET /api/livros`: Lista paginada de livros com filtros (`titulo`, `autor`, `ano`, `avaliacaoMin`) e ordenação por `avaliacao`.
- `GET /api/livros/:id`: Retorna um livro específico.
- `POST /api/livros`: Cadastra um novo livro.
- `PUT /api/livros/:id`: Atualiza um livro.
- `DELETE /api/livros/:id`: Remove um livro.

> O filtro por **ano** busca dentro de `dataLeitura` (mesmo que esteja em formato `yyyy-mm-dd`).

---

## 📜 Scripts

| Comando         | Ação                                     |
|----------------|------------------------------------------|
| `npm run dev`  | Inicia o servidor em modo de desenvolvimento |
| `npm start`    | Inicia o servidor em modo de produção    |

---

## 💾 Exemplo de livro para cadastro

```json
{
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "paginas": 464,
  "avaliacao": 4.8,
  "dataLeitura": "2024-07-15"
}
```

---

## 🖥️ Demo

Você pode testar a API online acessando:

[https://seu-link-no-vercel.vercel.app](https://seu-link-no-vercel.vercel.app)  

---

## 🤝 Contribuição

Contribuições são bem-vindas! Abra uma issue ou envie um pull request com melhorias ou correções.

---

## 📝 Licença

MIT

---

## 👤 Autor

### Grupo Wi (World Innovation):
### *Herivelton Henrique Gonçalves*
### *Gabriel*
### *Breno*
### *Wendel*