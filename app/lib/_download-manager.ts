import ytdl from "ytdl-core";
import http from "https";
import fs from "fs";
import tmp from "tmp";
import { ffmpeg } from "../utils";

export class DownloadManager {
    async getInfo(url: string): Promise<downloadInfoResponse> {
        return new Promise((resolve) => {
            ytdl.getInfo(url)
                .then(resolve)
                .catch((e) =>
                    resolve({
                        error: e.message,
                    })
                );
        });
    }

    async downloadVideo(
        url: string,
        downloadProgressSync?: (p: number) => any
    ): Promise<downloadResponse> {
        return new Promise((resolve) => {
            let totalFileSize: number;
            const tmpFile = tmp.fileSync();
            const file = fs.createWriteStream(tmpFile.name);

            const response = (error?: string): void => {
                if (error) tmpFile.removeCallback();
                file.close();
                resolve({
                    error,
                    tmpFile,
                });
            };

            http.get(url, (res: ResponseIncomingMessage) => {
                res.pipe(file);
                totalFileSize = parseInt(String(res.headers["content-length"]));
                res.on("error", (e) => response("DOWNLOAD_ERROR"));
                res.on("end", () => response());
                if (typeof downloadProgressSync === "function")
                    res.on("data", downloadProgressSync);
                //
            }).on("error", () => {
                response("HTTP_Error");
            });
        });
    }

    async convert(file: tmpFile, output: string): Promise<convertResponse> {
        return new Promise((resolve) => {
            if (!fs.existsSync(file.name)) {
                resolve({
                    error: "CONVERT_INPUT_NOTFOUND",
                });
            }
            ffmpeg()
                .input(file.name)
                .save(output)
                .on("end", () => {
                    console.log("Convert Completed.");
                    file.removeCallback();
                    resolve({
                        file: output,
                    });
                })
                .on("error", (e) => {
                    resolve({
                        error: "CONVERT_ERROR",
                    });
                });
        });
    }
}
