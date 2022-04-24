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
    }

    interface Window {
        api: Api;
    }

    export type mediaType = "audio" | "video";
    export type mediaFormat = "mp4" | "mp3" | "webm";
}

declare module "react-redux" {
    interface DefaultRootState extends RootState {}
}
