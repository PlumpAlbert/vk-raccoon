const { app, BrowserWindow, ipcMain } = require("electron");

const isDev = process.env.NODE_ENV === "development";

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

var mainWindow,
  secondaryWindow = null;

//#region Helper Functions
async function getToken() {
  if (secondaryWindow === null) return;
  let token = await secondaryWindow.webContents.executeJavaScript(
    `var query = new URLSearchParams(location.hash.replace("#", "?"));
    query.get("access_token")`
  );
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
    secondaryWindow.webContents.once("did-finish-load", () => getToken(secondaryWindow.webContents.executeJavaScript));
    secondaryWindow.webContents.executeJavaScript("btn.onclick()");
  }
  // Else get the access token
  else getToken();
}
//#endregion

app.once("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { webSecurity: !isDev }
  });
  mainWindow.loadURL(isDev ? "http://localhost:3000" : require("path").join(__dirname, "app/build/index.html"));
  mainWindow.webContents.once("did-finish-load", () => {
    secondaryWindow = new BrowserWindow({
      show: false,
      webPreferences: { webSecurity: !isDev }
    });
    secondaryWindow.webContents.once("did-finish-load", giveAccess);
    // Loading VK Auth page
    secondaryWindow.loadURL(
      "https://oauth.vk.com/authorize?client_id=6845379&redirect_uri=https://oauth.vk.com/blank.html&display=popup&scope=wall&response_type=token&v=5.92&state=raccoon&revoke=1"
    );
  });
  mainWindow.show();
});

ipcMain.on("login", async (e, { email, pass }) => {
  // console.log(`> Email: ${email};\n> Pass: ${pass}`);
  if (secondaryWindow === null)
    secondaryWindow = new BrowserWindow({
      show: false,
      webPreferences: { webSecurity: !isDev }
    });
  // Loading VK Auth page
  secondaryWindow.loadURL(
    "https://oauth.vk.com/authorize?client_id=6845379&redirect_uri=https://oauth.vk.com/blank.html&display=popup&scope=wall&response_type=token&v=5.92&state=raccoon&revoke=1"
  );
  secondaryWindow.webContents.once("did-finish-load", async () => {
    // Finding form for sign in
    let form = await secondaryWindow.webContents.executeJavaScript("var form=document.querySelector('form'); form");
    // If none - give access to this app
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
