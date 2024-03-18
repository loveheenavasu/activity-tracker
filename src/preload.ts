import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  resetData: async (data: any) =>
    ipcRenderer.invoke("resetUserActivity", data).then(),
  getUserActivity: async () =>
    ipcRenderer
      .invoke("userActivity")
      .then()
      .then((data) => data),
});
