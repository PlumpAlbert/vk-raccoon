const { app, BrowserWindow, ipcMain } = require("electron");

const isDev = process.env.NODE_ENV === "development";
const authUrl = "https://oauth.vk.com/authorize?client_id=6845379&redirect_uri=https://oauth.vk.com/blank.html&display=popup&scope=wall,friends,photos&response_type=token&v=5.92&state=raccoon&test_mode=1";

if (isDev) {
  const { default: installExtension, REDUX_DEVTOOLS } = require("electron-devtools-installer");

  installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.error("An error occurred: ", err));

  const debug = require("electron-debug");
  debug({ devToolsMode: "undocked" });
  ipcMain.on("console", (e, msg) => {
    console.log(msg);
  });
}

var mainWindow;

//#region Helper Functions
async function getToken() {
  if (secondaryWindow === null) return;
  console.log(await secondaryWindow.webContents.executeJavaScript('location'));
  let token = await secondaryWindow.webContents.executeJavaScript(
    `var query = new URLSearchParams(location.hash.replace("#", "?")); query.get("access_token")`
  );
  console.log(await secondaryWindow.webContents.executeJavaScript('query'))
  console.log("> Token:", token);
  if (mainWindow === null) return;
  if (token) mainWindow.webContents.send("token", token);
  secondaryWindow.close();
  secondaryWindow = null;
}

async function giveAccess() {
  if (secondaryWindow === null) return;
  var btn = await secondaryWindow.webContents.executeJavaScript(
    'var btn = document.querySelector(".flat_button.fl_r.button_indent"); btn'
  );
  // If it's a first time user logs in
  // allowing app to get access to account
  if (btn) {
    secondaryWindow.webContents.once("did-finish-load", () => getToken());
    secondaryWindow.webContents.executeJavaScript("btn.onclick()");
  }
  // Else get the access token
  else getToken();
}
//#endregion

app.once("ready", () => {
  mainWindow = new BrowserWindow({
    minWidth: 1000,
    minHeight: 528 + 25,
    width: 1280,
    height: 800,
    webPreferences: { webSecurity: !isDev }
  });
  mainWindow.loadURL(authUrl);
  mainWindow.webContents.once('did-finish-load', () => mainWindow.show());
  mainWindow.webContents.on('did-navigate', () => {
    let [, token] = mainWindow.webContents.getURL().match(/access_token=(\w+)/) || [];
    if (token) {
      mainWindow.loadURL(isDev ? "http://localhost:3000" : require("path").join(__dirname, "app/build/index.html"));
      mainWindow.webContents.removeAllListeners('did-navigate');
      mainWindow.webContents.once('did-stop-loading', () => {
        mainWindow.webContents.send('token', token)
      });
    }
  })
});
