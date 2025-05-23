import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
  getStaticData: () => console.log("Evan Joseph"),

  subscribeStatistic: (callback: (statistics: any) => void) => {
    ipcRenderer.on("generateString", (_: any, data: any) => {
      callback(data);
    });
  },

  getUserList: async () => {
    return await ipcRenderer.invoke("user:getAll");
  },

  createUser: async (user: User) => {
    return await ipcRenderer.invoke("user:create", user);
  },
});
