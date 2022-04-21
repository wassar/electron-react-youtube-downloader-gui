import {
    APPEND_DOWNLOAD_HISTORY,
    DELETE_DOWNLOAD_HISTORY,
    UPDATE_DOWNLOAD_HISTORY,
    CLEAR_DOWNLOAD_HISTORY,
} from "./types";

export const appendNewDownload = (newDownload: downloadHistory) => ({
    type: APPEND_DOWNLOAD_HISTORY,
    newDownload,
});

export const deleteDownload = (id: number) => ({
    type: DELETE_DOWNLOAD_HISTORY,
    id,
});

export const updateDownloadHistory = (newHistory: downloadHistory[]) => ({
    type: UPDATE_DOWNLOAD_HISTORY,
    newHistory,
});

export const clearDownloadHistory = () => ({
    type: CLEAR_DOWNLOAD_HISTORY,
});
