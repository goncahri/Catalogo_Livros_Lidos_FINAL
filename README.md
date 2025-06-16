
# 📚 Catálogo de Livros - API com MongoDB

<<<<<<< HEAD
Este projeto é uma API RESTful para gerenciamento de livros lidos. Utiliza **Node.js**, **Express** e **MongoDB** como banco de dados. Permite **cadastrar, editar, excluir e listar livros**, com recursos de **filtros**, **ordenação**, **paginação**, **validações**, **autenticação via JWT** e **documentação automática com Swagger**.
=======
Este projeto é uma aplicação web com **API RESTful** para o gerenciamento dos seus livros lidos, você amante da leitura. Desenvolvido com **Node.js**, **Express** e **MongoDB**, o sistema permite **cadastrar**, **listar**, **editar** e **excluir** livros, oferecendo funcionalidades adicionais como **filtros** por título, autor, ano de leitura, ordenação por avaliação e paginação de resultados. Ideal para quem deseja acompanhar suas leituras de forma organizada e visual.
>>>>>>> 52f406d6d33db186175d4e07b743ef8226baf4bb

---

## 📋 Índice

- [📦 Requisitos](#-requisitos)
- [🚀 Instalação](#-instalação)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔐 Autenticação JWT](#-autenticação-jwt)
- [🔌 Endpoints da API](#-endpoints-da-api)
<<<<<<< HEAD
- [🧪 Testes](#-testes)
- [📃 Documentação Swagger](#-documentação-swagger)
- [💾 Exemplo de livro](#-exemplo-de-livro)
- [🔥 Scripts Disponíveis](#-scripts-disponíveis)
=======
- [📜 Scripts](#-scripts)
- [💾 Exemplo de livro para cadastro](#-exemplo-de-livro-para-cadastro)
- [☁️ Deploy no Vercel](#️-deploy-no-vercel)
>>>>>>> 52f406d6d33db186175d4e07b743ef8226baf4bb
- [🖥️ Demo](#️-demo)
- [🤝 Contribuição](#-contribuição)
- [📝 Licença](#-licença)
- [👤 Autor](#-autor)

---

## 📦 Requisitos

- Node.js (versão 18 ou superior)
- MongoDB (local ou na nuvem - MongoDB Atlas)
- Ferramenta de testes de API (REST Client, Postman, Thunder Client, Insomnia, etc.)

---

## 🚀 Instalação

### 1️⃣ Clone o repositório

```bash
<<<<<<< HEAD
git clone https://github.com/seu-usuario/catalogo-livros.git
cd catalogo-livros
=======
git clone https://github.com/goncahri/Catalogo_Livros_Lidos
cd Catalogo_Livros_Lidos

>>>>>>> 52f406d6d33db186175d4e07b743ef8226baf4bb
```

### 2️⃣ Instale as dependências

```bash
npm install
```

### 3️⃣ Configure o arquivo `.env`

Crie um arquivo `.env` na raiz seguindo o modelo abaixo:

```env
<<<<<<< HEAD
=======
MONGO_URI=mongodb://localhost:27017/catalogo-livros
DB_NAME=livrosdb
>>>>>>> 52f406d6d33db186175d4e07b743ef8226baf4bb
PORT=3000
MONGO_URI=sua_uri_mongodb
DB_NAME=livrosdb
SECRET_KEY=seu_secret_jwt
EXPIRES_IN=24h

# Usuário de teste
SENHA_USUARIO=senha-do-usuario-de-teste
```

---

## 📂 Estrutura do Projeto

```
.
├── api/
<<<<<<< HEAD
│   ├── config/           # Configurações (banco de dados)
│   ├── controllers/      # Regras de negócio (CRUD, autenticação)
│   ├── middleware/       # Middlewares (validação, auth)
│   ├── model/            # Modelos do MongoDB
│   ├── routes/           # Rotas da API
│   ├── public/           # Front-end (HTML, imagens)
│   ├── swagger.json      # Documentação Swagger gerada
│   └── index.js          # Arquivo principal
├── __tests__/            # Testes automatizados (Jest + Supertest)
├── .env-example          # Exemplo de configuração
├── jest.config.js        # Configuração do Jest
├── package.json          # Dependências e scripts
├── vercel.json           # Deploy no Vercel
└── README.md             # Documentação
```

---

## 🔐 Autenticação JWT

Para acessar os endpoints da API é necessário:

- 🔑 Fazer login via `POST /api/usuarios/login`
- Obter o token JWT (enviado na resposta)
- Enviar esse token no header `Authorization` nas requisições protegidas.

Exemplo de header:

```http
Authorization: Bearer seu_token_jwt
=======
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
>>>>>>> 52f406d6d33db186175d4e07b743ef8226baf4bb
```

---

## 🔌 Endpoints da API

### 🔐 Rotas de Usuário

- `POST /api/usuarios/register` ➝ Cria um usuário
- `POST /api/usuarios/login` ➝ Autentica e gera token

### 📚 Rotas de Livros (Protegidas)

- `GET /api/livros` ➝ Lista livros (com filtros, ordenação e paginação)
- `GET /api/livros/:id` ➝ Busca livro por ID
- `POST /api/livros` ➝ Cadastra novo livro
- `PUT /api/livros/:id` ➝ Edita livro
- `DELETE /api/livros/:id` ➝ Remove livro

### 🌐 Documentação Swagger

- `GET /api-docs` ➝ Acessa documentação interativa da API

---

## 🧪 Testes

### ✅ Instalação dos pacotes de testes

```bash
npm install jest supertest -D
```

### ✅ Descrição dos pacotes:

| Pacote       | Descrição                                                               |
| ------------- | ------------------------------------------------------------------------ |
| **Jest**      | Framework de testes em JavaScript para testes unitários e integração.  |
| **SuperTest** | Faz requisições HTTP e testa respostas de APIs Node.js.                 |

### ✅ Organização dos testes:

- Crie a pasta `__tests__` na raiz.
- Crie os arquivos de testes, exemplo: `api.test.js`.

### ✅ Scripts no `package.json`:

```json
"scripts": {
  "test": "jest"
}
```

### ✅ Executar os testes:

```bash
npm run test
```

---

## 📃 Documentação Swagger

### 🚀 Instale os pacotes:

```bash
npm install swagger-ui-express
npm install swagger-autogen -D
```

### 🔗 Acesso à documentação interativa:

```
http://localhost:3000/api-docs
```

Ou no Vercel:

```
https://seu-projeto.vercel.app/api-docs
```

---

## 💾 Exemplo de livro

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

## 🔥 Scripts Disponíveis

| Comando        | Descrição                                     |
|----------------|-----------------------------------------------|
| `npm run dev`  | Inicia o servidor em modo desenvolvimento    |
| `npm start`    | Inicia o servidor em modo produção           |
| `npm run test` | Executa os testes automáticos                |

---

## 🖥️ Demo

Você pode acessar o projeto funcionando em:

<<<<<<< HEAD
[https://seu-projeto.vercel.app](https://seu-projeto.vercel.app)
=======
https://front-catalogo-livros-lidos.vercel.app/ 
>>>>>>> 52f406d6d33db186175d4e07b743ef8226baf4bb

---

## 🤝 Contribuição

Contribuições são bem-vindas! 

- Abra uma issue com melhorias, correções ou dúvidas.
- Envie um pull request.

---

## 📝 Licença

Este projeto está licenciado sob a licença **MIT**.

---

## 👤 Autor

### Grupo Wi (World Innovation):

### *Herivelton Henrique Gonçalves*
### *Gabriel Ribeiro Correa*
### *Breno Jose da Silva*
<<<<<<< HEAD
### *Wendel Augusto Lopes Vasco*


=======
### *Wendel Augusto Lopes Vasco*
>>>>>>> 52f406d6d33db186175d4e07b743ef8226baf4bb
