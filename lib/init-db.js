import Database from "better-sqlite3";
import path from "path";

let db = null;

export function initializeDatabase() {
  if (db) return db;

  const dbPath = path.join(process.cwd(), "database.sqlite");
  db = new Database(dbPath);

  db.prepare(`CREATE TABLE IF NOT EXISTS participants (
    participant_id TEXT PRIMARY KEY,
    group_number INTEGER NOT NULL,
    complete INTEGER DEFAULT 0
  )`).run();

  db.prepare(`CREATE TABLE IF NOT EXISTS responses (
    response_id INTEGER PRIMARY KEY AUTOINCREMENT,
    block INTEGER NOT NULL,
    colour TEXT NOT NULL,
    is_word INTEGER NOT NULL,
    is_correct INTEGER NOT NULL,
    response_time REAL NOT NULL,
    participant_id TEXT NOT NULL,
    FOREIGN KEY (participant_id) REFERENCES participants(participant_id) ON DELETE CASCADE
  )`).run();

  return db;
}