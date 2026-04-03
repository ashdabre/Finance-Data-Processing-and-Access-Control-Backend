require('dotenv').config();
const Database = require('better-sqlite3');

// Use DB_PATH from .env, fallback to default
const dbPath = process.env.DB_PATH || "./finance.db";
const db = new Database(dbPath);

// Create tables if they don't exist
db.prepare(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  role TEXT,
  status TEXT
)
`).run();

db.prepare(`
CREATE TABLE IF NOT EXISTS records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  amount REAL,
  type TEXT,
  category TEXT,
  date TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`).run();

// Insert default admin if not exists
db.prepare(`
INSERT OR IGNORE INTO users (username, password, role, status)
VALUES ('admin', '123', 'admin', 'active')
`).run();

module.exports = db;