// api/config/db.js
import { MongoClient } from "mongodb";

let db;

export async function connectToDatabase(app) {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    db = client.db(process.env.DB_NAME);
    app.locals.db = db;
    console.log("🟢 Conectado ao MongoDB");
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
    throw err; // melhor do que process.exit() em ambiente serverless
  }
}

// Para quem precisar acessar o db depois de conectado
export function getDb() {
  if (!db) {
    throw new Error("❌ Banco de dados não conectado!");
  }
  return db;
}
