const { app, BrowserWindow, shell } = require("electron");
const path = require("node:path");

const allowedHosts = new Set([
  "www.leagueoflegends.com",
  "developer.riotgames.com",
  "ddragon.leagueoflegends.com",
]);

function openOfficialPage(address) {
  try {
    const url = new URL(address);
    if (url.protocol === "https:" && allowedHosts.has(url.hostname))
      shell.openExternal(url.href);
  } catch {
    /* Ignore malformed external URLs. */
  }
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1200,
    height: 830,
    minWidth: 800,
    minHeight: 620,
    backgroundColor: "#f5f3ed",
    title: "召喚本色 · Rift Compass",
    icon: path.join(__dirname, "../dist/assets/app-icon.png"),
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });
  window.webContents.setWindowOpenHandler(({ url }) => {
    openOfficialPage(url);
    return { action: "deny" };
  });
  window.webContents.on("will-navigate", (event) => event.preventDefault());
  window.once("ready-to-show", () => window.show());
  const devUrl = process.env.RIFT_DEV_URL;
  if (!app.isPackaged && devUrl === "http://127.0.0.1:5173")
    window.loadURL(devUrl);
  else window.loadFile(path.join(__dirname, "../dist/index.html"));
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (!BrowserWindow.getAllWindows().length) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
