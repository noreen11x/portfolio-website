<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Portfolio Contact Messages</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body{font-family:Arial,Helvetica,sans-serif;background:#0f1724;color:#e6eef6;padding:24px}
        .container{max-width:1100px;margin:0 auto;background:#071025;border-radius:10px;padding:24px;box-shadow:0 10px 30px rgba(0,0,0,0.6)}
        .header{background:linear-gradient(90deg,#0b1220,#0d1630);padding:18px;border-radius:8px;color:#fff;text-align:center}
        table{width:100%;border-collapse:collapse;margin-top:18px}
        th,td{padding:12px;border-bottom:1px solid rgba(255,255,255,0.04);text-align:left}
        th{color:#cfe8ff;background:rgba(255,255,255,0.02)}
        .no-messages{padding:40px;text-align:center;color:#9fb7d9}
        .error{background:#2b0a0a;color:#ffdede;padding:12px;border-radius:8px;margin:16px 0}
        .refresh-btn{display:inline-block;margin-top:14px;padding:10px 16px;background:#1f6feb;color:#fff;border-radius:8px;text-decoration:none}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📩 Contact Messages</h1>
            <p>Messages submitted via the portfolio contact form</p>
        </div>

<?php
// Development helpers (remove or disable in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

$dbPath = __DIR__ . '/database.sqlite';

// quick existence/permission check
if (!file_exists($dbPath)) {
    echo '<div class="no-messages"><h2>Database not found</h2><p>The file <code>server/database.sqlite</code> was not found. Create the SQLite DB or verify the path.</p></div>';
    echo '<a class="refresh-btn" href="view-messages.php">🔄 Retry</a>';
    exit;
}
if (!is_readable($dbPath)) {
    echo '<div class="error"><strong>Permission error:</strong> database file exists but is not readable by the web server. Fix file permissions (chown/chmod).</div>';
    echo '<a class="refresh-btn" href="view-messages.php">🔄 Retry</a>';
    exit;
}

try {
    $db = new PDO('sqlite:' . $dbPath);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Make sure table exists (safety check)
    $check = $db->query("SELECT name FROM sqlite_master WHERE type='table' AND name='messages'")->fetch(PDO::FETCH_ASSOC);
    if (!$check) {
        echo '<div class="no-messages"><h2>No messages table</h2><p>The SQLite database does not contain a <code>messages</code> table.</p></div>';
        exit;
    }

    // Get total count
    $countStmt = $db->query('SELECT COUNT(*) as total FROM messages');
    $totalCount = (int) ($countStmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0);

    // Get all messages
    $stmt = $db->query('SELECT id, name, email, message, created_at FROM messages ORDER BY datetime(created_at) DESC');
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Display summary
    echo '<div style="margin-top:16px;display:flex;gap:12px;align-items:center">';
    echo '<div style="padding:12px 16px;background:#071827;border-radius:8px">Total messages: <strong>' . $totalCount . '</strong></div>';
    echo '<a class="refresh-btn" href="view-messages.php">🔄 Refresh</a>';
    echo '</div>';

    if (empty($messages)) {
        echo '<div class="no-messages"><h2>No messages yet</h2><p>No contact form submissions found.</p></div>';
    } else {
        echo '<table aria-label="Messages">';
        echo '<thead><tr><th>#</th><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr></thead><tbody>';
        foreach ($messages as $m) {
            $msg = htmlspecialchars($m['message'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
            $name = htmlspecialchars($m['name'] ?? '-', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
            $email = htmlspecialchars($m['email'] ?? '-', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
            $date = htmlspecialchars($m['created_at'] ?? '-', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
            echo "<tr>";
            echo "<td>{$m['id']}</td>";
            echo "<td>{$name}</td>";
            echo "<td><a style='color:#9fd1ff;text-decoration:none' href='mailto:{$email}'>{$email}</a></td>";
            echo "<td style='max-width:560px;white-space:pre-wrap'>{$msg}</td>";
            echo "<td style='color:#9fb7d9;font-size:0.95rem'>{$date}</td>";
            echo "</tr>";
        }
        echo '</tbody></table>';
    }

} catch (PDOException $e) {
    // Clear, helpful error for debugging
    echo '<div class="error"><strong>Database error:</strong> ' . htmlspecialchars($e->getMessage()) . '</div>';
    // optional: show stack in dev
    // echo '<pre>' . htmlspecialchars($e) . '</pre>';
}
?>

    </div>
</body>
</html>

