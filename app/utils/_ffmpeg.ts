import ffmpeg from "fluent-ffmpeg";
import ffmperStatic from "ffmpeg-static";
const ffprobePath = require("@ffprobe-installer/ffprobe").path.replace(
    "app.asar",
    "app.asar.unpacked"
);

const ffmpegPath = ffmperStatic.replace("app.asar", "app.asar.unpacked");

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

export { ffmpeg };
