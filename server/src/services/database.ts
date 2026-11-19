import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';

const dbPath = path.join(__dirname, '../../database.sqlite');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Promisify database methods with proper typing
const dbRun = (sql: string, params?: any[]): Promise<{ lastID?: number; changes?: number }> => {
    return new Promise((resolve, reject) => {
        db.run(sql, params || [], function(err) {
            if (err) reject(err);
            else resolve({ lastID: this.lastID, changes: this.changes });
        });
    });
};

const dbGet = (sql: string, params?: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
        db.get(sql, params || [], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const dbAll = (sql: string, params?: any[]): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        db.all(sql, params || [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows || []);
        });
    });
};

// Initialize database tables
async function initializeDatabase() {
    try {
        await dbRun(`
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                ip_address TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `).catch(err => {
            // Ignore if table already exists
            if (!err.message.includes('already exists')) {
                throw err;
            }
        });

        // Create index on email and created_at for faster queries
        await dbRun(`
            CREATE INDEX IF NOT EXISTS idx_email ON messages(email)
        `);
        await dbRun(`
            CREATE INDEX IF NOT EXISTS idx_created_at ON messages(created_at)
        `);

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

// Save message to database
export async function saveMessage(name: string, email: string, message: string, ipAddress?: string): Promise<number> {
    try {
        const result = await dbRun(
            'INSERT INTO messages (name, email, message, ip_address) VALUES (?, ?, ?, ?)',
            [name, email, message, ipAddress || null]
        );
        return (result as any).lastID;
    } catch (error) {
        console.error('Error saving message to database:', error);
        throw error;
    }
}

// Get message count from IP in the last hour (for spam protection)
export async function getMessageCountFromIP(ipAddress: string, hours: number = 1): Promise<number> {
    try {
        const result = await dbGet(
            `SELECT COUNT(*) as count FROM messages 
             WHERE ip_address = ? AND created_at > datetime('now', '-' || ? || ' hours')`,
            [ipAddress, hours]
        );
        return (result as any)?.count || 0;
    } catch (error) {
        console.error('Error getting message count:', error);
        return 0;
    }
}

// Get message count from email in the last hour
export async function getMessageCountFromEmail(email: string, hours: number = 1): Promise<number> {
    try {
        const result = await dbGet(
            `SELECT COUNT(*) as count FROM messages 
             WHERE email = ? AND created_at > datetime('now', '-' || ? || ' hours')`,
            [email, hours]
        );
        return (result as any)?.count || 0;
    } catch (error) {
        console.error('Error getting message count:', error);
        return 0;
    }
}

// Get all messages (for admin purposes)
export async function getAllMessages(limit: number = 50): Promise<any[]> {
    try {
        const messages = await dbAll(
            'SELECT * FROM messages ORDER BY created_at DESC LIMIT ?',
            [limit]
        );
        return messages;
    } catch (error) {
        console.error('Error getting messages:', error);
        return [];
    }
}

// Close database connection
export function closeDatabase() {
    return new Promise<void>((resolve, reject) => {
        db.close((err) => {
            if (err) {
                reject(err);
            } else {
                console.log('Database connection closed');
                resolve();
            }
        });
    });
}

export default db;

