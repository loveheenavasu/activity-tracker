import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  sentData: async (data: any) => ipcRenderer.send("sentData", data),
  getUserActivity: async () =>
    ipcRenderer
      .invoke("userActivity")
      .then()
      .then((data) => data),
});
