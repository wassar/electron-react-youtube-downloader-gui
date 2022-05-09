import os from "os";
import path from "path";

export const appSettingsDefaults = {
    downloads_path: path.join(os.homedir(), "Documents", "yt-downloads"),
    ui_mode: "system",
};

export const browserWindowDefaults = {
    width: 550,
    height: 750,
    resizable: false,
};
