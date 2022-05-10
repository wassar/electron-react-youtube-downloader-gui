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

export const databasePath = path.join(
    __dirname,
    process.env.ELECTRON_ENV === "dev" ? "../../app.db" : "app.db"
);
