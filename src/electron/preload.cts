const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeBNRCourseRate: (callback) => {
    return ipcOn("getBNRCourseRate", (courseRates) => callback(courseRates));
  },
  getBNRCourseRate: async () => electron.ipcRenderer.invoke("getBNRCourseRate"),
  sendFrameAction: (payload: FrameWindowAction) =>
    electron.ipcRenderer.send("sendFrameAction", payload),
} satisfies Window["electron"]);

export function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key);
}

export function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}

export function ipcSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  payload: EventPayloadMapping[Key]
) {
  electron.ipcRenderer.send(key, payload);
}
