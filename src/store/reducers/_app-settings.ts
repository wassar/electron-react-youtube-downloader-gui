import { RESTORE_SETTINGS, UPDATE_SETTINGS } from "../actions/types";

const initalState: appSettings = {
    ui_mode: "system",
    downloads_path: "/Users/was/Documents/yt-downloads",
};

interface actionProps {
    type: string;
    settings?: Partial<appSettings>;
}

export const appSettings = (state = initalState, action: actionProps) => {
    switch (action.type) {
        case UPDATE_SETTINGS:
            return { ...state, ...action.settings };
        case RESTORE_SETTINGS:
            return initalState;
        default:
            return state;
    }
};
