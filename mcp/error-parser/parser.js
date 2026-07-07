const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// 💡 DYNAMIC PATHING: This is what separates your projects.
const PROJECT_ROOT = process.env.PROJECT_CWD || process.cwd();
const DB_PATH = path.join(PROJECT_ROOT, 'project_errors.db');

// Ensure the directory exists
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(DB_PATH);

const errorParser = {
    initialize() {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`CREATE TABLE IF NOT EXISTS error_patterns (
                    id TEXT PRIMARY KEY, 
                    title TEXT, 
                    category TEXT, 
                    severity TEXT,
                    root_cause TEXT,
                    resolution TEXT,
                    tags TEXT
                )`, (err) => {
                    if (err) return reject(err);
                    console.error(`[database] ✅ Workspace DB ready at: ${DB_PATH}`);
                    resolve({ status: 'success', message: 'Blank workspace initialized' });
                });
            });
        });
    },

    listErrors(options = {}) {
        return new Promise((resolve, reject) => {
            const keyword = options.keyword;
            if (keyword && keyword.trim()) {
                const term = `%${keyword.trim()}%`;
                db.all(
                    `SELECT * FROM error_patterns
                     WHERE title LIKE ? OR category LIKE ? OR root_cause LIKE ? OR resolution LIKE ? OR tags LIKE ?`,
                    [term, term, term, term, term],
                    (err, rows) => {
                        if (err) return reject(err);
                        resolve(rows);
                    }
                );
            } else {
                db.all('SELECT * FROM error_patterns', [], (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
                });
            }
        });
    },

    // Shim for ERP functions so server.js doesn't crash
    updateStock: async (sku, qty) => ({ sku, change: qty }),
    createUser: async (email) => ({ email, id: 'new-workspace-user' })
};

module.exports = errorParser;