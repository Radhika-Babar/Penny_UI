const { contextBridge, ipcRenderer } =
require("electron");

contextBridge.exposeInMainWorld(
  "pennyAPI",
  {
    getHardwareAudit: () =>
      ipcRenderer.invoke(
        "hardware-audit"
      )
  }
);