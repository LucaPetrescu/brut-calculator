import { BrowserWindow, ipcMain, WebContents, WebFrameMain } from "electron";
import { getUIPath } from "./pathResolve.js";
import { pathToFileURL } from "url";

type WebContentsAction =
  | {
      event: "did-finish-load";
      action: (window: BrowserWindow) => void | Promise<void>;
    }
  | {
      event: "dom-ready";
      action: (window: BrowserWindow) => void | Promise<void>;
    };

export function registerWebContentsAction(
  window: BrowserWindow,
  config: WebContentsAction
) {
  if (config.event === "did-finish-load") {
    window.webContents.on("did-finish-load", () => config.action(window));
  } else if (config.event === "dom-ready") {
    window.webContents.on("dom-ready", () => config.action(window));
  }
}

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function ipcHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => Promise<EventPayloadMapping[Key]>
) {
  ipcMain.handle(key, async (event) => {
    validateEventFrame(event.senderFrame);
    return await handler();
  });
}

export function ipcMainOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: (payload: EventPayloadMapping[Key]) => void
) {
  ipcMain.on(key, (event, payload) => {
    validateEventFrame(event.senderFrame);
    return handler(payload);
  });
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key]
) {
  webContents.send(key, payload);
}

export function validateEventFrame(frame: WebFrameMain | null) {
  if (!frame) {
    throw new Error("No event frame available");
  }

  if (isDev() && new URL(frame.url).host === "localhost:5123") {
    return;
  }

  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error("Invalid event frame");
  }
}
