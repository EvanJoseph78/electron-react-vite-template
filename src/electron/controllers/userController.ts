// user controller.ts

import { ipcMain } from "electron";
import { createUser, getUserList } from "../models/userModel.js";

// Define o canal para comunicação entre o processo principal e o renderer
const USER_CHANNEL = "user";

/**
 * Handler para obter todos os usuários.
 * Canal: user:getAll
 * @param _event Evento IPC (não utilizado).
 * @returns Promise<User[]> Lista de usuários.
 */
ipcMain.handle(`${USER_CHANNEL}:getAll`, async () => {
  const users = await getUserList();
  return users;
});

/**
   * Handler para criar um usuário.
   * Canal: user:create
   * @param _event Evento IPC (não utilizado).
   * @param user Objeto com os dados do usuário.
   */
ipcMain.handle(`${USER_CHANNEL}:create`, async (_event, user) => {
  const newUser = await createUser(user);
  return newUser;
});
