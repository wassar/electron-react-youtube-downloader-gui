import path from "path";
import { app, BrowserWindow, ipcMain, shell, Event } from "electron";
import { pathSelect } from "./utils";
import * as handle from "./core";
import { browserWindowDefaults } from "./utils";

if (require("electron-squirrel-startup")) {
    app.quit();
}

let mainWindow: BrowserWindow;

const createWindow = async () => {
    const { width, height, resizable } = browserWindowDefaults;

    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "./preload.js"),
        },
    });

    //disable window resize
    mainWindow.resizable = resizable;

    if (process.env.ELECTRON_ENV === "dev") {
        // Open the DevTools.
        mainWindow.webContents.openDevTools();
        mainWindow.loadURL("http://localhost:3000/");
    } else {
        mainWindow.loadFile(path.join(__dirname, "index.html"));
        mainWindow.webContents.openDevTools();
    }

    //opening links in new window
    mainWindow.webContents.on("will-navigate", handleRedirect);
    mainWindow.webContents.on("new-window", handleRedirect);
};

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
    //handle.closeConnection();
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.whenReady().then(createWindow);

const handleRedirect = (e: Event, url: string) => {
    e.preventDefault();
    if (url != mainWindow.webContents.getURL()) shell.openExternal(url);
};

ipcMain.on("settings:select-download-path", async (e) => {
    e.returnValue = await pathSelect(mainWindow);
});

ipcMain.on("history:get", handle.getHistory);
ipcMain.on("settings:get", handle.getSettings);
ipcMain.on("settings:update", handle.getHistory);

ipcMain.on("download:info", handle.newDownloadInfo);
ipcMain.on("download:start", handle.downloadStart);
ipcMain.on("download:history-action", handle.downloadActions);
