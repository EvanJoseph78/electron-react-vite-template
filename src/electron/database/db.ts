/**
 * Database connection and initialization using better-sqlite3.
 * This script handles the database file location and ensures
 * that necessary tables are created when the app starts.
 */

import Database from "better-sqlite3";
import path from "path";
import { app } from "electron";

// Define o caminho onde o banco de dados será salvo dentro da pasta do aplicativo
const dbPath = path.join(app.getPath("userData"), "app.db");

// Cria a instância do banco de dados SQLite
// O banco será criado automaticamente se não existir
const db = new Database(dbPath);

// Função para inicializar as tabelas do banco
function initializeDatabase() {
  // Cria a tabela 'users' se ela não existir
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      idade INTEGER NOT NULL,
      profissao TEXT NOT NULL
    )
  `;

  // Cria a tabela 'clientes' se ela não existir
  const createClientesTable = `
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      telefone TEXT
    )
  `;

  db.prepare(createUsersTable).run();
  db.prepare(createClientesTable).run();
}

// Inicializa o banco de dados
initializeDatabase();

// Exporta a instância do banco para ser utilizada em outros módulos
export default db;
