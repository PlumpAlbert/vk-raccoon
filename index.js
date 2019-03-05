const { app, BrowserWindow, ipcMain } = require("electron");

if (process.env.NODE_ENV === "development") {
  const debug = require("electron-debug");
  debug({ devToolsMode: "undocked" });
}

var mainWindow;

app.once("ready", () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : require("path").join(__dirname, "app/build/index.html")
  );
  mainWindow.show();
});
