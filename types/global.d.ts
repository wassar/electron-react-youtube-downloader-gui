import { MoreVideoDetails, videoInfo } from "ytdl-core";
import { FileResult } from "tmp";
import { IncomingMessage } from "http";

declare global {
    interface downloadError {
        error: string;
    }

    type downloadInfoResponse = videoInfo | downloadError;

    export type ResponseIncomingMessage = IncomingMessage;

    export type tmpFile = FileResult;

    export interface downloadResponse {
        error?: string;
        tmpFile: FileResult;
        [k: string]: any;
    }

    export interface convertResponse {
        error?: string;
        file?: string;
    }
}
export {};
