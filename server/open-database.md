# How to Open the Database

## Option 1: Using DB Browser for SQLite (GUI - Recommended)

1. **Install DB Browser for SQLite:**
   ```bash
   brew install --cask db-browser-for-sqlite
   ```
   
   Or download from: https://sqlitebrowser.org/

2. **Open the database:**
   - Open DB Browser for SQLite
   - Click "Open Database"
   - Navigate to: `portfolio-website/server/database.sqlite`
   - You'll see a nice GUI with tables, data, and can run queries

## Option 2: Using VS Code Extension

1. **Install SQLite Viewer extension in VS Code:**
   - Open VS Code
   - Go to Extensions (Cmd+Shift+X)
   - Search for "SQLite Viewer" or "SQLite"
   - Install one of the extensions
   - Right-click on `database.sqlite` and select "Open Database"

## Option 3: Using Command Line (Quick View)

```bash
cd portfolio-website/server
node view-database.js
```

## Option 4: Using TablePlus (Premium GUI)

1. Download TablePlus from: https://tableplus.com/
2. Open the app
3. Click "Create a new connection"
4. Select SQLite
5. Browse to `database.sqlite` file

## Option 5: Using a Web Interface

You can create a simple admin page to view messages in the browser!

