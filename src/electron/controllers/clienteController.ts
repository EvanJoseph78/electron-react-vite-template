// clienteController.ts

import { ipcMain } from "electron";
import { createCliente, getClienteList } from "../models/clienteModel.js";

// Define o canal para comunicação entre o processo principal e o renderer
const CLIENTE_CHANNEL = "cliente";

/**
 * Handler para obter todos os clientes.
 * Canal: cliente:getAll
 * @returns Promise<Cliente[]> Lista de clientes.
 */
ipcMain.handle(`${CLIENTE_CHANNEL}:getAll`, async () => {
    const clientes = getClienteList();
    return clientes;
});

ipcMain.handle(`${CLIENTE_CHANNEL}:create`, async (_event, cliente) => {
  // cliente é esperado um objeto com { nome, telefone, email }
  const newCliente = await createCliente(cliente);
  return newCliente;
});
