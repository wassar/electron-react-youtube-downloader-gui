import store from "./store";

declare global {
    type RootState = ReturnType<typeof store.getState>;
    export interface Api {
        getAppSettings: () => appSettings;
        getDownloadHistory: () => downloadHistory[];
        updateSettings: (s: appSettings) => appSettings;
        updateDownloadsPath: () => null | string;
    }

    interface Window {
        api: Api;
    }
}

declare module "react-redux" {
    interface DefaultRootState extends RootState {}
}
