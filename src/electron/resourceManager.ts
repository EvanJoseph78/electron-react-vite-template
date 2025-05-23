import { BrowserWindow } from "electron";

const POLLING_INTERVAL = 1000; // 1 second

export function poolResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const generateString = await generateRandomString(10);
    mainWindow.webContents.send("generateString", generateString);
  }, POLLING_INTERVAL);
}

function generateRandomString(length: number): Promise<string> {
  return new Promise((resolve) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    resolve(result); // <-- Aqui resolve a Promise com o resultado
  });
}
