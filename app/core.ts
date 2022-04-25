import { IpcMainEvent, clipboard, DownloadItem } from "electron";
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
) => {
    //
    if (!fs.existsSync(downloads_path)) fs.mkdirSync(downloads_path);

    const download = await manager.downloadVideo(item.url, (data) => {
        e.reply("download:sync", historyItem.id, data);
    });

    if (download.error) {
        console.log("Downoad Error", download.error);
        return;
    }

    const response = await manager.convert(
        download.tmpFile,
        path.join(downloads_path, `${historyItem.title}.${historyItem.format}`)
    );

    if (response.error) console.log("convert errored", response.error);

    delete historyItem.id;
    historyItem.status = "downloaded";
    historyItem.download_path = response.file;

    await database.setHistoryItem(historyItem);
    e.reply("history:update", await database.getHistory());
};
