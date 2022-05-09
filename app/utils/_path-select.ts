import { dialog, BrowserWindow } from "electron";
export const pathSelect = async (window: BrowserWindow) => {
    try {
        const path = dialog.showOpenDialogSync(window, {
            properties: ["openDirectory"],
        });
        return path[0];
    } catch (e) {
        return null;
    }
};
