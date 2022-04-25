import { IpcMainEvent, clipboard, DownloadItem } from "electron";
import path from "path";
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
    const download = await manager.downloadVideo(item.url);

    if (download.error) {
        console.log("Downoad Error", download.error);
    }

    const response = await manager.convert(
        download.tmpFile,
        path.resolve(
            downloads_path,
            `${historyItem.title}.${historyItem.format}`
        )
    );

    if (response.error) console.log("convert errored", response.error);
};
