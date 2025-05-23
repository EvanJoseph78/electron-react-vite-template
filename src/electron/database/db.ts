import Database from "better-sqlite3";
import path from "path";
import { app } from "electron";

// Cria o caminho para o banco dentro da pasta do app
const dbPath = path.join(app.getPath("userData"), "app.db");
const db = new Database(dbPath);

// Cria tabela se não existir
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    idade INTEGER NOT NULL,
    profissao TEXT NOT NULL
  )
`
).run();

export default db;
