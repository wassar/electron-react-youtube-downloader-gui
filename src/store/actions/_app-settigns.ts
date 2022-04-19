import { RESTORE_SETTINGS, UPDATE_SETTINGS } from "./types";

export const updateSettings = (settings: Partial<appSettings>) => ({
    type: UPDATE_SETTINGS,
    settings,
});

export const restoreSettings = () => ({
    type: RESTORE_SETTINGS,
});
