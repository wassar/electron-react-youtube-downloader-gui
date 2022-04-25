import { IpcRendererEvent } from "electron";
import store from "./store";

declare global {
    type RootState = ReturnType<typeof store.getState>;
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
        startNewDownload: (
            i: vidFormat,
            d: downloadHistory,
            o: string
        ) => downloadHistory;
    }

    interface Window {
        api: Api;
    }
}

declare module "react-redux" {
    interface DefaultRootState extends RootState {}
}
