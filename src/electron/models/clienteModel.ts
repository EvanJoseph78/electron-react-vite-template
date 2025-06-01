import db from "../database/db.js";

// Lista todos os clientes
export const getClienteList = () => {
  return db.prepare("SELECT * FROM cliente").all();
};

// Busca um cliente pelo ID
export const getClienteById = (id: number) => {
  return db.prepare("SELECT * FROM cliente WHERE id = ?").get(id);
};

// Cria um novo cliente
export const createCliente = (cliente: Omit<Client, 'id'>) => {
  if (!cliente.nome) {
    throw new Error("O campo 'nome' é obrigatório.");
  }

  const keys = Object.keys(cliente);
  const values = Object.values(cliente);

  const columns = keys.join(", ");
  const placeholders = keys.map(() => "?").join(", ");

  const sql = `INSERT INTO cliente (${columns}) VALUES (${placeholders})`;

  return db.prepare(sql).run(...values);
};

// Atualiza um cliente existente
export const updateCliente = (
  id: number,
  nome: string,
  telefone?: string,
  endereco?: string,
  numero?: string,
  email?: string,
  bairro?: string,
  cidade?: string,
  estado?: string,
  cpf?: string,
  cnpj?: string
) => {
  return db
    .prepare(
      `UPDATE cliente SET 
         nome = ?, telefone = ?, endereco = ?, numero = ?, email = ?, bairro = ?, cidade = ?, estado = ?, cpf = ?, cnpj = ? 
       WHERE id = ?`
    )
    .run(
      nome,
      telefone,
      endereco,
      numero,
      email,
      bairro,
      cidade,
      estado,
      cpf,
      cnpj,
      id
    );
};

// Remove um cliente
export const deleteCliente = (id: number) => {
  return db.prepare("DELETE FROM cliente WHERE id = ?").run(id);
};
