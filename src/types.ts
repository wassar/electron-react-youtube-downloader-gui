import { IpcRendererEvent } from "electron";
import store from "./store";

export interface Api {
    getAppSettings: () => appSettings;
    getDownloadHistory: () => downloadHistory[];
    updateSettings: (s: appSettings) => appSettings;
    updateDownloadsPath: () => null | string;
    //
    getNewDownloadInfo: () => void;
    onNewDownloadInfo: (
        callback: (e: IpcRendererEvent, r: downloadInfoResponse) => void
    ) => void;
    //
    startNewDownload: (i: vidFormat, d: downloadHistory) => downloadHistory;
    //
    onDownloadSync: (
        cb: (e: IpcRendererEvent, id: number, data: downloadSyncProps) => void
    ) => void;
    onDownloadError: (
        cb: (e: IpcRendererEvent, id: number, error: string) => void
    ) => void;

    onHistoryUpdate: (
        cb: (e: IpcRendererEvent, history: downloadHistory[]) => void
    ) => void;
    handleDownloadAction: (action: string, item: downloadHistory) => void;
}

declare global {
    type RootState = ReturnType<typeof store.getState>;

    interface Window {
        api: Api;
    }
}

declare module "react-redux" {
    interface DefaultRootState extends RootState {}
}
