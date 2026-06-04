const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const os = require("os");

function createWindow() {

  const win = new BrowserWindow({
    width: 1280,
    height: 850,
    minWidth: 1100,
    minHeight: 700,
    backgroundColor: "#fff8e8",

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true
    }
  });

  win.loadFile("renderer/index.html");

  win.webContents.setWindowOpenHandler(() => ({
    action: "deny"
  }));

  win.webContents.on("console-message", (event, level, message, line, sourceId) => {
    console.log(`Renderer console [${level}] ${sourceId}:${line} - ${message}`);
  });

  win.webContents.on("will-navigate", e => {
    e.preventDefault();
  });
}

ipcMain.handle("hardware-audit", async () => {

  return {
    cpu: os.cpus()[0].model,
    cores: os.cpus().length,
    ram:
      Math.round(
        os.totalmem() /
        1024 /
        1024 /
        1024
      ) + " GB",

    platform: os.platform(),
    architecture: os.arch(),
    hostname: os.hostname()
  };
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {

  if (process.platform !== "darwin") {
    app.quit();
  }

});