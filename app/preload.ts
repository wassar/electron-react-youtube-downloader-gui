// @ts-nocheck
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    getAppSettings() {
        return ipcRenderer.sendSync("settings:get");
    },
    getDownloadHistory() {
        return ipcRenderer.sendSync("history:get");
    },
    updateSettings(settings: appSettings) {
        ipcRenderer.send("settings:update", settings);
        return settings;
    },
    updateDownloadsPath() {
        return ipcRenderer.sendSync("settings:select-download-path");
    },
});
