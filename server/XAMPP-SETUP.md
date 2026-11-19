# XAMPP Database Viewer Setup ✅

## Files Copied Successfully!

Your database viewer is now set up in XAMPP.

## How to Access:

1. **Start XAMPP** (if not already running)
   - Open XAMPP Control Panel
   - Start Apache server

2. **Open in Browser:**
   ```
   http://localhost/portfolio-db/view-messages.php
   ```

## What You'll See:

- 📊 Total message count
- 📧 All contact form messages in a beautiful table
- 🔄 Refresh button to update the view
- 📱 Responsive design

## Updating the Database:

The PHP file reads from:
```
/Applications/XAMPP/htdocs/portfolio-db/database.sqlite
```

**To keep it updated**, you have two options:

### Option 1: Manual Copy (when needed)
```bash
cp /Users/adhamfarag/Desktop/nc/portfolio-website/server/database.sqlite /Applications/XAMPP/htdocs/portfolio-db/
```

### Option 2: Create a Symlink (auto-updates)
```bash
# Remove the copied file first
rm /Applications/XAMPP/htdocs/portfolio-db/database.sqlite

# Create a symlink
ln -s /Users/adhamfarag/Desktop/nc/portfolio-website/server/database.sqlite /Applications/XAMPP/htdocs/portfolio-db/database.sqlite
```

## Troubleshooting:

- **404 Error**: Make sure Apache is running in XAMPP
- **Database not found**: Check file permissions
- **Blank page**: Check Apache error logs in XAMPP

