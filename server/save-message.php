<?php
header('Content-Type: application/json; charset=utf-8');
ini_set('display_errors', 1);
error_reporting(E_ALL);

$dbPath = __DIR__ . '/database.sqlite';

try {
    $db = new PDO('sqlite:' . $dbPath);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create table if missing (schema aligned with Node/TypeScript service)
    $db->exec("CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        ip_address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    // Ensure legacy databases have the ip_address column
    $colsStmt = $db->query("PRAGMA table_info(messages)");
    $columns = $colsStmt->fetchAll(PDO::FETCH_ASSOC);
    $hasIpColumn = false;
    foreach ($columns as $col) {
        if (isset($col['name']) && $col['name'] === 'ip_address') {
            $hasIpColumn = true;
            break;
        }
    }
    if (!$hasIpColumn) {
        $db->exec("ALTER TABLE messages ADD COLUMN ip_address TEXT");
    }

    // Accept JSON or form POST
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $message = trim($input['message'] ?? '');
    $ip = $_SERVER['REMOTE_ADDR'] ?? null;

    if ($name === '' || $email === '' || $message === '') {
        http_response_code(400);
        echo json_encode(['ok' => false, 'message' => 'Missing fields']);
        exit;
    }

    $stmt = $db->prepare("INSERT INTO messages (name, email, message, ip_address) VALUES (:name, :email, :message, :ip)");
    $stmt->execute([
        ':name'    => $name,
        ':email'   => $email,
        ':message' => $message,
        ':ip'      => $ip
    ]);

    echo json_encode(['ok' => true, 'id' => $db->lastInsertId(), 'message' => 'Message saved successfully']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => $e->getMessage()]);
}
?>