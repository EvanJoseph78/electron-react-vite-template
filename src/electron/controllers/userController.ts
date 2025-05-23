// user controller.ts

import { ipcMain } from "electron";
import { createUser, getUserList } from "../models/userModel.js";

// Handler para listar usuários
ipcMain.handle("user:getAll", async () => {
  const users = await getUserList();
  return users;
});

ipcMain.handle("user:create", async (_event, user) => {
  const newUser = await createUser(user);
  return newUser;
});

