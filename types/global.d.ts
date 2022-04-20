import { MoreVideoDetails, videoInfo } from "ytdl-core";
import { FileResult } from "tmp";
import { IncomingMessage } from "http";

declare global {
    interface downloadError {
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
    }

    export interface vidDetails extends MoreVideoDetails {}
    export interface vidInfo extends videoInfo {}

    export interface downloadInfoResponse extends Partial<videoInfo> {
        error?: string;
    }

    //export type downloadInfoResponse = videoInfo | downloadError;
    export type ResponseIncomingMessage = IncomingMessage;
    export type tmpFile = FileResult;
}
export {};
