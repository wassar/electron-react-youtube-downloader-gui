import knex, { Knex } from "knex";
import path from "path";
import { defaults } from "../utils";

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

    async init(): Promise<void> {
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
                table.timestamp("downloaded_at");
                table.string("download_path");
                table.string("status");
            });
        }

        if (!(await this.db.schema.hasTable("app_settings"))) {
            await this.db.schema.createTable("app_settings", (table) => {
                table.increments("id").primary().unique();
                table.string("ui_mode");
                table.string("downloads_path");
            });
        }

        if (!(await this.getSettings()))
            await this.db("app_settings").insert(defaults);
    }

    async getSettings(): Promise<appSettings> {
        return await this.db("app_settings")
            .select("downloads_path", "ui_mode")
            .first();
    }

    async updateSettings(newSettings: Partial<appSettings>) {
        await this.db("app_settings").update(newSettings).where({ id: 1 });
    }

    async getHistory(): Promise<downloadHistory[]> {
        return await this.db("history").select("*").orderBy("id", "desc");
    }

    async setHistoryItem(download: downloadHistory): Promise<number> {
        return (await this.db("history").insert(download).returning("id"))[0];
    }

    async deleteHistoryItem(id: number): Promise<void> {
        await this.db("history").del().where({ id });
    }

    async close(): Promise<void> {
        await this.db.destroy();
    }
}
