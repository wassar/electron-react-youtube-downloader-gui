import isDev from "electron-is-dev";
import path from "path";
import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
/*
import {
    handleNewDownload,
    handleStartDownload,
    handleSettingsUpdate,
    handleDownloadsPathUpdate,
} from "./core";
*/

require("dotenv").config();

let mainWindow: BrowserWindow;

const createWindow = () => {
    const { APP_WINDOW_WIDTH, APP_WINDOW_HEIGHT } = process.env;

    mainWindow = new BrowserWindow({
        width: Number(APP_WINDOW_WIDTH),
        height: Number(APP_WINDOW_HEIGHT),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    //disable window resize
    mainWindow.resizable = false;

    if (isDev) {
        mainWindow.loadURL("http://localhost:3000/");
        // Open the DevTools.
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
    }
};

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.whenReady().then(createWindow);
