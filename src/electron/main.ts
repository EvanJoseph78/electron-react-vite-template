import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";
// import { poolResources } from "./resourceManager.js";

// Importa o controller que registra os handlers IPC
import "./controllers/userController.js";
import "./controllers/clienteController.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  // Desativa a barra de menu
  mainWindow.setMenuBarVisibility(false);
  // Ou para remover totalmente:
  // mainWindow.setMenu(null);

  // poolResources(mainWindow);
});
