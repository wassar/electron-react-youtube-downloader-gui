import os from "os";
import path from "path";

export const defaults = {
    downloads_path: path.join(os.homedir(), "Documents", "yt-downloads"),
    ui_mode: "system",
};
