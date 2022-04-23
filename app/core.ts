import { IpcMainEvent, clipboard } from "electron";
import { DownloadManager } from "./lib";

const manager = new DownloadManager();

export const handleNewDownloadInfo = async (e: IpcMainEvent) => {
    console.log("NEW DOWNLOAD CALLED");
    const link = clipboard.readText();
    const info = await manager.getInfo(link);

    e.reply("download:info-ready", info);
};
