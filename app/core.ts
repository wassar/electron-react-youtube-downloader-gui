import { IpcMainEvent, clipboard, shell, ipcMain } from "electron";
import path from "path";
import fs from "fs";

import { DownloadManager, Store } from "./lib";

const manager = new DownloadManager();
const store = new Store();
store.init().then();

export async function getSettings(e: IpcMainEvent) {
    e.returnValue = await store.getSettings();
}

export async function getHistory(e: IpcMainEvent) {
    e.returnValue = await store.getHistory();
}

export async function updateSettings(e: IpcMainEvent, settings: appSettings) {
    await store.updateSettings(settings);
}

export async function newDownloadInfo(
    e: IpcMainEvent,
    url = clipboard.readText()
): Promise<void> {
    e.reply("download:info-ready", await manager.getInfo(url));
}

export async function downloadStart(
    e: IpcMainEvent,
    item: vidFormat,
    historyItem: downloadHistory
): Promise<void> {
    const { downloads_path } = await store.getSettings();

    if (!fs.existsSync(downloads_path)) fs.mkdirSync(downloads_path);

    const download = await manager.downloadVideo(item.url, (data) => {
        e.reply("download:sync", historyItem.id, data);
    });

    if (download.error) {
        e.reply("download:error", download.error);
        return;
    }

    const response = await manager.convert(
        download.tmpFile,
        path.join(downloads_path, `${historyItem.title}.${historyItem.format}`)
    );

    if (response.error) {
        e.reply("download:error", download.error);
        return;
    }

    delete historyItem.id;
    historyItem.status = "complete";
    historyItem.download_path = response.file;

    await store.setHistoryItem(historyItem);
    e.reply("history:update", await store.getHistory());
}

export function downloadActions(
    e: IpcMainEvent,
    action: string,
    item: downloadHistory
): void {
    switch (action) {
        case "PLAY_DOWNLOAD":
            shell.openPath(item.download_path!);
            break;
        case "OPEN_FOLDER":
            shell.showItemInFolder(item.download_path!);
            break;
        case "VISIT_VIDEO_PAGE":
            shell.openExternal(item.video_url);
            break;
        case "DELETE_DOWNLOAD":
            this.store.deleteHistoryItem(item.id);
            break;
    }
}

export function closeConnection() {
    store.close();
}
