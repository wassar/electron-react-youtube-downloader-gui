import { MoreVideoDetails, videoInfo, Author, videoFormat } from "ytdl-core";
import { FileResult } from "tmp";
import { IncomingMessage } from "http";

declare global {
    export interface downloadError {
        error: string;
    }

    export interface downloadResponse {
        error?: string;
        tmpFile: FileResult;
        [k: string]: any;
    }

    export interface convertResponse {
        error?: string;
        file?: string;
    }

    export interface appSettings {
        id?: number;
        ui_mode: "system" | "dark" | "light";
        downloads_path: string;
    }

    export interface downloadHistory {
        id?: number;
        videoId: string;
        video_url: string;
        title: string;
        lengthSeconds: number;
        viewCount: number;
        author: string;
        thumbnails: string;
        channelId: string;
        downloaded_at: number;
        format: string;
        type: string;
        download_path?: string;
        download_progress?: number;
        status?:
            | "pending"
            | "downloading"
            | "processing"
            | "complete"
            | "error";
        error?: string;
    }

    export interface downloadSyncProps {
        totalFileSize: number;
        downloadedSize: number;
        percentage: number;
    }

    export interface vidDetails extends MoreVideoDetails {}
    export interface vidInfo extends videoInfo {}
    export interface vidAuthor extends Author {}
    export interface vidFormat extends videoFormat {}

    export interface downloadInfoResponse extends Partial<videoInfo> {
        error?: string;
    }

    export type ResponseIncomingMessage = IncomingMessage;
    export type tmpFile = FileResult;

    export type mediaType = "audio" | "video";
    export type mediaFormat = "mp4" | "mp3" | "webm";
    export type downloadSync = (p: downloadSyncProps) => any;
}
export {};
