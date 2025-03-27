const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('grocery.db');

// Create table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product TEXT NOT NULL,
    price REAL NOT NULL,
    addedAt TEXT DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = db;
