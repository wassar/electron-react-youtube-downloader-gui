// @ts-nocheck
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    getAppSettings() {
        return ipcRenderer.sendSync("settings:get");
    },
    getDownloadHistory() {
        return ipcRenderer.sendSync("history:get");
    },
    updateSettings(settings) {
        ipcRenderer.send("settings:update", settings);
        return settings;
    },
    updateDownloadsPath() {
        return ipcRenderer.sendSync("settings:select-download-path");
    },

    //
    getNewDownloadInfo() {
        ipcRenderer.send("download:info");
    },
    onNewDownloadInfo(callback) {
        ipcRenderer.on("download:info-ready", callback);
    },
    //
    startNewDownload(item, downloadHistoryItem) {
        return ipcRenderer.send("download:start", item, downloadHistoryItem);
    },
    onDownloadSync(callback) {
        ipcRenderer.on("download:sync", callback);
    },
    onDownloadError(callback) {
        ipcRenderer.on("download:error", callback);
    },
    //
    onHistoryUpdate(callback) {
        ipcRenderer.on("history:update", callback);
    },
    //
    handleDownloadAction(action, item) {
        ipcRenderer.send("download:history-action", action, item);
    },
});
