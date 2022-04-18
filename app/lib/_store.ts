import sqlite from "sqlite3";
import knex, { Knex } from "knex";
import path from "path";

import { MoreVideoDetails } from "ytdl-core";
import { table } from "console";

// id
// videoId
// video_url
// title
// lengthSeconds
// viewCount
// author
// thumbnails
// channelId
// downloadedAt
// format
// type

export class Store {
    private db: Knex;
    constructor() {
        this.db = knex({
            client: "sqlite3",
            connection: {
                filename: path.resolve(__dirname, "../../app.db"),
            },
            useNullAsDefault: true,
        });
    }

    async init() {
        if (!(await this.db.schema.hasTable("history"))) {
            await this.db.schema.createTable("history", (table) => {
                table.increments("id").primary().unique();
                table.string("videoId");
                table.string("video_url");
                table.string("title");
                table.integer("lengthSeconds");
                table.integer("viewCount");
                table.text("author");
                table.text("thumbnails");
                table.string("channelId");
                table.string("format");
                table.string("type");
                table.timestamp("downloadedAt");
            });
        }

        if (!(await this.db.schema.hasTable("app_settings"))) {
            await this.db.schema.createTable("app_settings", (table) => {
                table.string("ui_mode");
                table.string("downloads_path");
            });
        }
    }

    async getSettings() {
        return await this.db("history").select("*");
    }

    updateSettings() {
        //this.db("settings").update("")
    }

    async getHistory() {
        const history = await this.db("history").select("*");
        console.log("HH", history);
        return history;
    }

    pushHistory() {}

    deleteHistoryItem() {}
}
