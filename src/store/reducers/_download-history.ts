import {
    APPEND_DOWNLOAD_HISTORY,
    CLEAR_DOWNLOAD_HISTORY,
    DELETE_DOWNLOAD_HISTORY,
    UPDATE_DOWNLOAD_HISTORY,
    SET_DOWNLOAD_HISTORY,
} from "../actions/types";

interface action {
    type: string;
    newDownload?: downloadHistory;
    newHistory?: downloadHistory[];
    historyUpdate?: Partial<downloadHistory>;
    id?: number;
}

const initialState = window.api.getDownloadHistory();

export const downloadHistory = (state = initialState, action: action) => {
    switch (action.type) {
        case SET_DOWNLOAD_HISTORY:
            return action.newHistory!;
        case APPEND_DOWNLOAD_HISTORY:
            return [action.newDownload!, ...state];
        case DELETE_DOWNLOAD_HISTORY:
            return state.filter(({ id }) => id !== action.id);
        case UPDATE_DOWNLOAD_HISTORY:
            return state.map((item) =>
                item.id !== action.id
                    ? item
                    : { ...item, ...action.historyUpdate }
            );
        case CLEAR_DOWNLOAD_HISTORY:
            return [] as downloadHistory[];
        default:
            return state;
    }
};
