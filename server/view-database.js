const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('📊 Portfolio Contact Form Messages\n');
console.log('=' .repeat(80));

// Get all messages
db.all('SELECT * FROM messages ORDER BY created_at DESC', (err, rows) => {
    if (err) {
        console.error('Error reading database:', err);
        db.close();
        return;
    }

    if (rows.length === 0) {
        console.log('\nNo messages found in the database.\n');
        db.close();
        return;
    }

    console.log(`\nTotal messages: ${rows.length}\n`);
    console.log('-'.repeat(80));

    rows.forEach((row, index) => {
        console.log(`\n📧 Message #${row.id}`);
        console.log(`   Name: ${row.name}`);
        console.log(`   Email: ${row.email}`);
        console.log(`   Message: ${row.message}`);
        console.log(`   IP Address: ${row.ip_address || 'N/A'}`);
        console.log(`   Date: ${row.created_at}`);
        if (index < rows.length - 1) {
            console.log('-'.repeat(80));
        }
    });

    console.log('\n' + '='.repeat(80));
    db.close();
});

