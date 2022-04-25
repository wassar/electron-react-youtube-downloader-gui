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
        downloadProgressSync?: downloadSync
    ): Promise<downloadResponse> {
        return new Promise((resolve) => {
            let totalFileSize: number;
            let downloadedSize = 0;
            let percentage = 0;

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
                totalFileSize = parseInt(String(res.headers["content-length"]));
                res.pipe(file);
                res.on("error", (e) => {
                    console.log("Download error", e);
                    response("DOWNLOAD_ERROR");
                });
                res.on("end", () => response());
                res.on("data", (data) => {
                    downloadedSize += data.length;
                    percentage = ~~((100.0 * downloadedSize) / totalFileSize);
                    if (typeof downloadProgressSync === "function")
                        downloadProgressSync({
                            totalFileSize,
                            downloadedSize,
                            percentage,
                        });
                });
                //
            }).on("error", (e) => {
                console.log("Error HTTP", e);
                response("HTTP_Error");
            });
        });
    }

    async convert(file: tmpFile, output: string): Promise<convertResponse> {
        console.log("FNAME", file.name);
        console.log("OUTPUT", output);

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
