export async function getUserList(): Promise<User[]> {
  return [
    {
      nome: "Evan Joseph",
      idade: 25,
      profissao: "Desenvolvedor",
    },
  ];
}

export async function createUser(user: User): Promise<User> {
  console.log("User created:", user);
  return user;
}