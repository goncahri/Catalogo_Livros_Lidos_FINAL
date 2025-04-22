import { ObjectId } from "mongodb";

// GET com filtros, paginação e ordenação
export const getLivros = async (req, res) => {
  const db = req.app.locals.db;
  const {
    titulo,
    autor,
    ano,
    avaliacaoMin,
    page = 1,
    limit = 10,
    sort,
    order = "asc"
  } = req.query;

  const filtro = {};
  if (titulo) filtro.titulo = { $regex: titulo, $options: "i" };
  if (autor) filtro.autor = { $regex: autor, $options: "i" };
  if (ano) filtro.dataLeitura = {
    $gte: new Date(`${ano}-01-01`),
    $lte: new Date(`${ano}-12-31`)
  };
  if (avaliacaoMin) filtro.avaliacao = { $gte: parseFloat(avaliacaoMin) };

  const pageInt = parseInt(page);
  const limitInt = parseInt(limit);
  const skip = (pageInt - 1) * limitInt;

  try {
    const cursor = db.collection("livros").find(filtro);

    if (sort) {
      const sortOptions = {};
      sortOptions[sort] = order === "desc" ? -1 : 1;
      cursor.sort(sortOptions);
    }

    const livros = await cursor.skip(skip).limit(limitInt).toArray();
    const total = await db.collection("livros").countDocuments(filtro);

    res.json({
      data: livros,
      pagination: {
        total,
        page: pageInt,
        limit: limitInt,
        pages: Math.ceil(total / limitInt)
      }
    });
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    res.status(500).json({ error: "Erro ao buscar livros" });
  }
};

// GET por ID
export const getLivroById = async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: true, message: "ID inválido" });
  }

  try {
    const livro = await db.collection("livros").findOne({ _id: new ObjectId(id) });
    if (!livro) {
      return res.status(404).json({ error: true, message: "Livro não encontrado" });
    }
    res.json(livro);
  } catch (error) {
    console.error("Erro ao buscar livro por ID:", error);
    res.status(500).json({ error: "Erro ao buscar livro por ID" });
  }
};

// POST (criar livro)
export const createLivro = async (req, res) => {
  const db = req.app.locals.db;
  const { titulo, autor, paginas, avaliacao, dataLeitura } = req.body;

  if (!titulo || !autor || !paginas || !avaliacao || !dataLeitura) {
    return res.status(400).json({ error: true, message: "Todos os campos são obrigatórios." });
  }

  const novoLivro = {
    titulo: String(titulo),
    autor: String(autor),
    paginas: Number(paginas),
    avaliacao: Number(avaliacao),
    dataLeitura: new Date(dataLeitura)
  };

  try {
    const result = await db.collection("livros").insertOne(novoLivro);
    res.status(201).json({ _id: result.insertedId, ...novoLivro });
  } catch (error) {
    console.error("❌ Erro ao cadastrar livro:", error);
    res.status(500).json({ error: true, message: "Erro ao cadastrar livro" });
  }
};

// PUT (atualizar livro)
export const updateLivro = async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  const { titulo, autor, paginas, avaliacao, dataLeitura } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: true, message: "ID inválido" });
  }

  try {
    const result = await db.collection("livros").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          titulo,
          autor,
          paginas: Number(paginas),
          avaliacao: Number(avaliacao),
          dataLeitura: new Date(dataLeitura)
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: true, message: "Livro não encontrado" });
    }

    res.json({ message: "Livro atualizado com sucesso" });
  } catch (error) {
    console.error("❌ Erro ao atualizar livro:", error);
    res.status(500).json({ error: true, message: "Erro ao atualizar livro" });
  }
};

// DELETE (remover livro)
export const deleteLivro = async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: true, message: "ID inválido" });
  }

  try {
    const result = await db.collection("livros").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: true, message: "Livro não encontrado" });
    }

    res.json({ message: "Livro removido com sucesso" });
  } catch (error) {
    console.error("❌ Erro ao excluir livro:", error);
    res.status(500).json({ error: true, message: "Erro ao excluir livro" });
  }
};

// GET com operadores avançados
export const consultaAvancada = async (req, res) => {
  const db = req.app.locals.db;

  try {
    const livros = await db.collection("livros").find({
      $or: [
        { avaliacao: { $gte: 4.5, $lte: 5 } },
        { autor: { $in: ["Robert C. Martin", "Luciano Ramalho"] } }
      ]
    }).toArray();

    res.json(livros);
  } catch (error) {
    console.error("Erro na consulta avançada:", error);
    res.status(500).json({ error: "Erro na consulta avançada" });
  }
};
