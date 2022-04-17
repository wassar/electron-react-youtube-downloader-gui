import { videoInfo } from "ytdl-core";
import { DownloadManager } from "./lib";

(async () => {
    const d = new DownloadManager();
    const vidUrl = "https://www.youtube.com/watch?v=aITIKxjFaL0";
    const vidInfo = await d.getInfo(vidUrl);
    const { formats } = vidInfo as videoInfo;
    const { url } = formats[formats.length - 3];

    const s = await d.downloadVideo(url, (data) => {
        console.log("DATA", data);
    });
    console.log("RESP", s);
})();
