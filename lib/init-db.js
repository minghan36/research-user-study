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
    complete INTEGER DEFAULT 0,
    block_one_start TEXT,
    block_one_end TEXT,
    block_one_mean REAL,
    block_one_accuracy REAL,
    intervention_start TEXT,
    intervention_end TEXT,
    block_two_start TEXT,
    block_two_end TEXT,
    block_two_mean REAL,
    block_two_accuracy REAL
  )`).run();

  db.prepare(`CREATE TABLE IF NOT EXISTS responses (
    response_id INTEGER PRIMARY KEY AUTOINCREMENT,
    block INTEGER NOT NULL,
    trial_number INTEGER NOT NULL,
    colour TEXT NOT NULL,
    is_word INTEGER NOT NULL,
    is_correct INTEGER NOT NULL,
    response_time REAL NOT NULL,
    participant_id TEXT NOT NULL,
    FOREIGN KEY (participant_id) REFERENCES participants(participant_id) ON DELETE CASCADE
  )`).run();

  return db;
}