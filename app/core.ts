import { IpcMainEvent, clipboard, shell } from "electron";
import path from "path";
import fs from "fs";

import { DownloadManager, Store } from "./lib";

const manager = new DownloadManager();
const database = new Store();

export const handleNewDownloadInfo = async (e: IpcMainEvent) => {
    //
    const link = clipboard.readText();

    const info = await manager.getInfo(link);

    e.reply("download:info-ready", info);
};

export const handleDownloadStart = async (
    e: IpcMainEvent,
    item: vidFormat,
    historyItem: downloadHistory,
    downloads_path: string
): Promise<void> => {
    //

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

    await database.setHistoryItem(historyItem);
    e.reply("history:update", await database.getHistory());
};
export const handleDownloadActions = (
    e: IpcMainEvent,
    action: string,
    item: downloadHistory
) => {
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
            database.deleteHistoryItem(item.id);
            break;
    }
};
