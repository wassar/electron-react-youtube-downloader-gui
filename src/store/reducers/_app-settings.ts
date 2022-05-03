import { RESTORE_SETTINGS, UPDATE_SETTINGS } from "../actions/types";

interface actionProps {
    type: string;
    settings?: Partial<appSettings>;
}

const initalState = window.api.getAppSettings();

export const appSettings = (state = initalState, action: actionProps) => {
    switch (action.type) {
        case UPDATE_SETTINGS:
            return window.api.updateSettings({ ...state, ...action.settings! });
        case RESTORE_SETTINGS:
            return initalState;
        default:
            return state;
    }
};
