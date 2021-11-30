const { app, BrowserWindow, ipcMain } = require("electron");
const download = require("download");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL("http://localhost:3000");

  win.once("ready-to-show", () => {
    win.show();
    win.webContents.send(
      "msgToFrontFromElectron",
      "Say Hallo to Electron, React!"
    );
  });

  ipcMain.handle("downloadAssets", () => {
    const URLZip =
      "https://codeload.github.com/VLabStudio/Tutorials/zip/master";

    (async function () {
      download(URLZip, "MY-ASSETS-FOLDER", { extract: true })
        .then(() => {
          console.log("done - 2");
          win.webContents.send("downloadEnd", "Download finished!");
        })
        .catch((err) => console.log("error: ", err));
    })();
  });
}

app.whenReady().then(() => createWindow());

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("download", () => {
  //   console.log("My node app..uhhuuu");
  //   const URL = "https://i.ytimg.com/vi/Oxj38vkwmBs/mqdefault.jpg";
  //   // 1.
  //   (async function () {
  //     download(URL, "test")
  //       .then(() =>  console.log("done"))
  //       .catch((err) => console.log("error: ", err));
  //   })();
  //  // 2. with options - a zip datei!!!
  //   const URLZip = "https://codeload.github.com/VLabStudio/Tutorials/zip/master";
  //   (async function () {
  //     download(URLZip, "MY-ASSETS-FOLDER", { extract: true })
  //       .then(() => {
  //         console.log("done");
  //       })
  //       .catch((err) => console.log("error: ", err));
  //   })();
});
