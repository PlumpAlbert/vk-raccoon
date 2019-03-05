const { app, BrowserWindow, ipcMain } = require("electron");

if (process.env.NODE_ENV === "development") {
  const { default: installExtension, REDUX_DEVTOOLS } = require("electron-devtools-installer");

  installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.error("An error occurred: ", err));

  const debug = require("electron-debug");
  debug({ devToolsMode: "undocked" });
}

var mainWindow,
  secondaryWindow = null;

//#region Helper Functions
async function getToken() {
  if (secondaryWindow === null) return;
  let token = await secondaryWindow.webContents.executeJavaScript(
    `var query = new URLSearchParams(location.hash.replace("#", "?"));
    query.get("access_token")`
  );
  if (mainWindow === null) return;
  if (token) mainWindow.webContents.send("token", token);
  else mainWindow.webContents.send("token", "err");
}
async function giveAccess() {
  if (secondaryWindow === null) return;
  var btn = await secondaryWindow.webContents.executeJavaScript(
    'var btn = document.querySelector(".flat_button.fl_r.button_indent"); btn'
  );
  // If it's a first time user logs in
  // allowing app to get access to account
  if (btn) {
    secondaryWindow.webContents.once("did-finish-load", () => getToken(secondaryWindow.webContents.executeJavaScript));
    secondaryWindow.webContents.executeJavaScript("btn.onclick()");
  }
  // Else get the access token
  else getToken(secondaryWindow.webContents.executeJavaScript);
}
//#endregion

app.once("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { webSecurity: process.env.NODE_ENV !== "development" }
  });
  mainWindow.loadURL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : require("path").join(__dirname, "app/build/index.html")
  );
  mainWindow.show();
});

ipcMain.on("login", async (e, { email, pass }) => {
  console.log(`Email: ${email};\nPass: ${pass}`);
  // if (secondaryWindow === null)
  secondaryWindow = new BrowserWindow({
    show: false,
    webPreferences: { webSecurity: process.env.NODE_ENV !== "development" }
  });
  secondaryWindow.webContents.closeDevTools();
  secondaryWindow.loadURL(
    "https://oauth.vk.com/authorize?client_id=6845379&redirect_uri=https://oauth.vk.com/blank.html &display=popup&scope=wall&response_type=token&v=5.92&state=raccoon&revoke=1"
  );
  secondaryWindow.webContents.once("did-finish-load", async () => {
    let form = await secondaryWindow.webContents.executeJavaScript("var form=document.querySelector('form'); form");
    if (!form) return giveAccess();
    secondaryWindow.webContents.executeJavaScript(
      `form['email'].value = '${email}';
      form['pass'].value = '${pass}';`
    );
    secondaryWindow.webContents.once("did-finish-load", giveAccess);
    // Uploading form for login
    secondaryWindow.webContents.executeJavaScript("form.submit()");
  });
});
