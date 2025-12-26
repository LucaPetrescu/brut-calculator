import { app, BrowserWindow } from "electron";
import { ipcHandle, registerWebContentsAction } from "./util.js";

import { getBNRCourseRate, fetchBNRCourseRate } from "./courseManager.js";
import { getPreloadPath, getUIPath } from "./pathResolve.js";
import { isDev } from "./util.js";

app.on("ready", async () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
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
});
