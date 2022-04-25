import {
    APPEND_DOWNLOAD_HISTORY,
    DELETE_DOWNLOAD_HISTORY,
    UPDATE_DOWNLOAD_HISTORY,
    CLEAR_DOWNLOAD_HISTORY,
    SET_DOWNLOAD_HISTORY,
} from "./types";

export const appendNewDownload = (newDownload: downloadHistory) => ({
    type: APPEND_DOWNLOAD_HISTORY,
    newDownload,
});

export const deleteDownload = (id: number) => ({
    type: DELETE_DOWNLOAD_HISTORY,
    id,
});

export const updateDownloadHistory = (
    id: number,
    historyUpdate: Partial<downloadHistory>
) => ({
    type: UPDATE_DOWNLOAD_HISTORY,
    id,
    historyUpdate,
});

export const clearDownloadHistory = () => ({
    type: CLEAR_DOWNLOAD_HISTORY,
});

export const setDownloadHistory = (newHistory: downloadHistory[]) => ({
    type: SET_DOWNLOAD_HISTORY,
    newHistory,
});
