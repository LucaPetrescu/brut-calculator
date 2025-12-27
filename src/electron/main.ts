import { app, BrowserWindow } from "electron";
import { ipcHandle, registerWebContentsAction, ipcMainOn } from "./util.js";

import { getBNRCourseRate, fetchBNRCourseRate } from "./courseManager.js";
import { getPreloadPath, getUIPath } from "./pathResolve.js";
import { isDev } from "./util.js";

app.on("ready", async () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    frame: false,
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  registerWebContentsAction(mainWindow, {
    event: "did-finish-load",
    action: async (window: BrowserWindow) => {
      await getBNRCourseRate(window);
    },
  });

  ipcHandle("getBNRCourseRate", async () => {
    return await fetchBNRCourseRate();
  });

  ipcMainOn("sendFrameAction", (payload) => {
    switch (payload) {
      case "CLOSE":
        mainWindow.close();
        break;
      case "MAXIMIZE":
        mainWindow.maximize();
        break;
      case "MINIMIZE":
        mainWindow.minimize();
        break;
    }
  });

  handleCloseEvents(mainWindow);
});

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;
  mainWindow.on("close", (e: Electron.Event) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on("before-quit", () => {
    willClose = true;
  });

  mainWindow.on("show", () => {
    willClose = false;
  });
}
