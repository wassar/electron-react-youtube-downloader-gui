import {
    APPEND_DOWNLOAD_HISTORY,
    CLEAR_DOWNLOAD_HISTORY,
    DELETE_DOWNLOAD_HISTORY,
    UPDATE_DOWNLOAD_HISTORY,
} from "../actions/types";

import dummyHistory from "../../download-history.dummy.json";

const initialState: downloadHistory[] = dummyHistory as downloadHistory[];

interface action {
    type: string;
    newDownload?: downloadHistory;
    newHistory?: downloadHistory[];
    id?: number;
}

export const downloadHistory = (state = initialState, action: action) => {
    switch (action.type) {
        case APPEND_DOWNLOAD_HISTORY:
            return [action.newDownload!, ...state];
        case DELETE_DOWNLOAD_HISTORY:
            return state.filter(({ id }) => id !== action.id);
        case UPDATE_DOWNLOAD_HISTORY:
            return action.newHistory!;
        case CLEAR_DOWNLOAD_HISTORY:
            return [] as downloadHistory[];
        default:
            return state;
    }
};
