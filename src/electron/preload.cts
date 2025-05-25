// Importa os módulos necessários do Electron
import { ipcRenderer, contextBridge } from "electron";

// Expõe uma API segura no contexto global do navegador (renderer)
// Isso permite que o frontend (React, etc.) se comunique com o backend (main) do Electron
contextBridge.exposeInMainWorld("electron", {
  /**
   * Função de teste simples.
   * Apenas imprime "Evan Joseph" no console do renderer.
   */
  getStaticData: () => console.log("Evan Joseph"),

  /**
   * Inscreve um callback que será chamado toda vez que o evento "generateString" for emitido.
   * Útil para receber dados em tempo real do processo principal (main).
   *
   * @param callback Função que recebe os dados enviados pelo evento.
   */
  subscribeStatistic: (callback: (statistics: any) => void) => {
    ipcRenderer.on("generateString", (_: any, data: any) => {
      callback(data);
    });
  },

  /**
   * Namespace 'user' para agrupar funcionalidades relacionadas a usuários.
   */
  user: {
    /**
     * Obtém a lista de todos os usuários.
     * Faz uma chamada assíncrona para o main process através do canal 'user:getAll'.
     *
     * @returns Promise<User[]> Lista de usuários.
     */
    getAll: async () => {
      return await ipcRenderer.invoke("user:getAll");
    },

    /**
     * Cria um novo usuário.
     * Envia os dados do usuário para o processo principal através do canal 'user:create'.
     *
     * @param user Objeto com os dados do usuário (nome, idade, profissão).
     * @returns Promise<User> O usuário criado (pode incluir ID ou outras infos).
     */
    create: async (user: User) => {
      return await ipcRenderer.invoke("user:create", user);
    },
  },

  /**
   * Namespace 'cliente' para agrupar funcionalidades relacionadas a clientes.
   */
  cliente: {
    /**
     * Obtém a lista de todos os clientes.
     * Faz uma chamada assíncrona para o main process através do canal 'cliente:getAll'.
     *
     * @returns Promise<Cliente[]> Lista de clientes.
     */
    getAll: async () => {
      return await ipcRenderer.invoke("cliente:getAll");
    },

    /**
     * Cria um novo cliente.
     * Envia os dados do cliente para o processo principal através do canal 'cliente:create'.
     *
     * @param cliente Objeto com os dados do cliente.
     * @returns Promise<Cliente> O cliente criado.
     */
    create: async (cliente: Client) => {
      return await ipcRenderer.invoke("cliente:create", cliente);
    },
  }
});
