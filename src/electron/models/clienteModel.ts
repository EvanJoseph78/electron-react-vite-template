import db from "../database/db.js";

// Lista todos os clientes
export const getClienteList = () => {
  return db.prepare("SELECT * FROM clientes").all();
};

// Busca um cliente pelo ID
export const getClienteById = (id: number) => {
  return db.prepare("SELECT * FROM clientes WHERE id = ?").get(id);
};

// Cria um novo cliente
export const createCliente = (
  nome: string,
  email: string,
  telefone: string
) => {
  return db
    .prepare("INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)")
    .run(nome, email, telefone);
};

// Atualiza um cliente existente
export const updateCliente = (id: number, nome: string, email: string) => {
  return db
    .prepare("UPDATE clientes SET nome = ?, email = ? WHERE id = ?")
    .run(nome, email, id);
};

// Remove um cliente
export const deleteCliente = (id: number) => {
  return db.prepare("DELETE FROM clientes WHERE id = ?").run(id);
};
