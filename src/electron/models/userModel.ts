import db from "../database/db.js";

export const getUserList = () => {
  return db.prepare("SELECT * FROM users").all();
};

export const createUser = (user: {
  nome: string;
  idade: number;
  profissao: string;
}) => {
  const stmt = db.prepare(
    "INSERT INTO users (nome, idade, profissao) VALUES (?, ?, ?)"
  );
  const info = stmt.run(user.nome, user.idade, user.profissao);
  return { id: info.lastInsertRowid, ...user };
};
