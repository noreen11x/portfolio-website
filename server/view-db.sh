#!/bin/bash
# Simple script to view database messages

cd "$(dirname "$0")"

echo "📊 Portfolio Contact Form Messages"
echo "=================================="
echo ""

# Check if sqlite3 is installed
if ! command -v sqlite3 &> /dev/null; then
    echo "sqlite3 is not installed. Installing via Homebrew..."
    brew install sqlite3
fi

# Display messages in a formatted way
sqlite3 database.sqlite <<EOF
.mode column
.headers on
.width 5 20 30 40 15 20
SELECT 
    id as ID,
    name as Name,
    email as Email,
    substr(message, 1, 40) || '...' as Message,
    ip_address as IP,
    created_at as Date
FROM messages 
ORDER BY created_at DESC;
EOF

echo ""
echo "Total messages:"
sqlite3 database.sqlite "SELECT COUNT(*) FROM messages;"

