import Database from "better-sqlite3";
import path from "path";
import { app } from "electron";
import schema from "./migrations/init.js";

const dbPath = path.join(app.getPath("userData"), "app.db");
const db = new Database(dbPath);

function initializeDatabase() {
    db.exec(schema);
}

initializeDatabase();

export default db;
