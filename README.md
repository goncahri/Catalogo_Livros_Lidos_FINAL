# 📚 Catálogo de Livros - API com MongoDB

Este projeto é uma aplicação web com **API RESTful** para o gerenciamento dos seus livros lidos, você amante da leitura. Desenvolvido com **Node.js**, **Express** e **MongoDB**, o sistema permite **cadastrar**, **listar**, **editar** e **excluir** livros, oferecendo funcionalidades adicionais como **filtros** por título, autor, ano de leitura, ordenação por avaliação e paginação de resultados. Ideal para quem deseja acompanhar suas leituras de forma organizada e visual.

---

## 📋 Índice

- [📦 Requisitos](#-requisitos)
- [🚀 Instalação](#-instalação)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔌 Endpoints da API](#-endpoints-da-api)
- [📜 Scripts](#-scripts)
- [💾 Exemplo de livro para cadastro](#-exemplo-de-livro-para-cadastro)
- [☁️ Deploy no Vercel](#️-deploy-no-vercel)
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
git clone https://github.com/goncahri/Catalogo_Livros_Lidos
cd Catalogo_Livros_Lidos

```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz com o seguinte conteúdo:

```env
MONGO_URI=mongodb://localhost:27017/catalogo-livros
DB_NAME=livrosdb
PORT=3000
```

---

## 📂 Estrutura do Projeto

```
.
├── api/
│   ├── config/           # Conexão com MongoDB
│   ├── controllers/      # Lógica das requisições (CRUD)
│   ├── http/             # Requisições REST para teste no VS Code (REST Client / Thunder Client, etc)
│   ├── middleware/       # Validações com express-validator
│   ├── routes/           # Rotas da API
│   └── index.js          # Entrada principal da API
├── public/
│   └── images/           # Imagens dos livros (caso existam)
│   └── index.html        # Front-end
├── vercel.json           # Configuração para deploy (se for hospedar no vercel)
├── .env                  # Variáveis de ambiente (.gitignore)
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

## ☁️ Deploy no Vercel

Este projeto está configurado para ser **hospedado no Vercel**, incluindo **front-end (HTML/CSS/JS)** e **back-end (API Node.js + MongoDB)** no mesmo repositório.

### 🛠 Estrutura utilizada

- O **back-end** está localizado na pasta `api/`
- O **front-end** está na pasta `public/`
- O arquivo `vercel.json` define o comportamento das rotas

```
├── api/              # API REST com Node.js e Express
├── public/           # Interface Web (index.html + JS)
├── vercel.json       # Arquivo de configuração do Vercel
```

### 🔁 Arquivo `vercel.json` utilizado

```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api"
    }
  ],
  "functions": {
    "api/index.js": {
      "includeFiles": "api/swagger/swagger_output.json"
    }
  }
}
```

> A diretiva `rewrites` garante que as chamadas feitas para `/api/...` no front-end sejam redirecionadas corretamente para a API.

---

### 🌐 Integração com Front-End

No `index.html` (front-end), o `baseURL` das requisições é configurado dinamicamente para funcionar tanto localmente quanto na Vercel:

```js
const baseURL = window.location.hostname.includes("localhost")
  ? "http://localhost:3000/api/livros"
  : "/api/livros";
```

---

### 🔐 Variáveis de Ambiente no Vercel

No painel da Vercel, adicione em **Settings > Environment Variables**:

| Variável     | Descrição                                   |
|--------------|----------------------------------------------|
| `MONGO_URI`  | URI de conexão com MongoDB Atlas             |
| `DB_NAME`    | Nome do banco de dados (exemplo: `livrosdb`) |

---

## 🖥️ Demo

Você pode testar a API online acessando:

https://front-catalogo-livros-lidos.vercel.app/ 

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
### *Gabriel Ribeiro Correa*
### *Breno Jose da Silva*
### *Wendel Augusto Lopes Vasco*