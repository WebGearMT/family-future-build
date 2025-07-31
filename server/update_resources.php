<?php
require_once 'db_connect.php';

// Handle CORS
header("Access-Control-Allow-Origin: https://app.gottabenc.com, http://localhost:8080, http://localhost:3306");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Invalid request method. Use POST to add resource.']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

// Check if required fields are present
if (!isset($input['title']) || !isset($input['description'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Title and description are required fields']);
    exit;
}

// Validate required fields are not empty
if (empty(trim($input['title'])) || empty(trim($input['description']))) {
    http_response_code(400);
    echo json_encode(['error' => 'Title and description cannot be empty']);
    exit;
}

// Sanitize input data
$title = htmlspecialchars(trim($input['title']), ENT_QUOTES, 'UTF-8');
$description = htmlspecialchars(trim($input['description']), ENT_QUOTES, 'UTF-8');
$icon = isset($input['icon']) ? htmlspecialchars(trim($input['icon']), ENT_QUOTES, 'UTF-8') : 'FileText';
$link = isset($input['link']) ? filter_var(trim($input['link']), FILTER_VALIDATE_URL) : null;
$linkText = isset($input['linkText']) ? htmlspecialchars(trim($input['linkText']), ENT_QUOTES, 'UTF-8') : 'Learn More';

// Handle items array (convert to JSON for storage)
$items = [];
if (isset($input['items']) && is_array($input['items'])) {
    foreach ($input['items'] as $item) {
        if (!empty(trim($item))) {
            $items[] = htmlspecialchars(trim($item), ENT_QUOTES, 'UTF-8');
        }
    }
}

// Validate input lengths
if (strlen($title) > 255) {
    http_response_code(400);
    echo json_encode(['error' => 'Title must be less than 255 characters']);
    exit;
}

if (strlen($description) > 1000) {
    http_response_code(400);
    echo json_encode(['error' => 'Description must be less than 1000 characters']);
    exit;
}

if ($link && !filter_var($link, FILTER_VALIDATE_URL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid URL format for link']);
    exit;
}

// Connect to the database
try {
    $db = connect();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Check if the table exists
try {
    $tableCheck = $db->query("SHOW TABLES LIKE 'resources'");
    if ($tableCheck->rowCount() === 0) {
        // Create the table if it doesn't exist
        $createTable = "CREATE TABLE resources (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            icon VARCHAR(100) DEFAULT 'FileText',
            description TEXT NOT NULL,
            items JSON,
            link VARCHAR(500),
            linkText VARCHAR(255) DEFAULT 'Learn More',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )";
        $db->exec($createTable);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database table error: ' . $e->getMessage()]);
    exit;
}

// Check if the resource title already exists (avoid duplicates)
try {
    $stmt = $db->prepare("SELECT id FROM resources WHERE title = ?");
    $stmt->execute([$title]);

    if ($stmt->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(['error' => 'A resource with this title already exists']);
        exit;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database query error: ' . $e->getMessage()]);
    exit;
}

// Convert items array to JSON
$itemsJson = json_encode($items);

// Insert the new resource
try {
    $stmt = $db->prepare("INSERT INTO resources (title, icon, description, items, link, linkText) VALUES (?, ?, ?, ?, ?, ?)");
    $result = $stmt->execute([$title, $icon, $description, $itemsJson, $link, $linkText]);

    if ($result) {
        $newId = $db->lastInsertId();

        // Get the newly created resource entry
        $stmt = $db->prepare("SELECT * FROM resources WHERE id = ?");
        $stmt->execute([$newId]);
        $newResource = $stmt->fetch(PDO::FETCH_ASSOC);

        // Decode items JSON for response
        if ($newResource && $newResource['items']) {
            $newResource['items'] = json_decode($newResource['items'], true);
        }

        echo json_encode([
            'success' => true,
            'message' => 'Resource added successfully',
            'id' => $newId,
            'data' => $newResource
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to insert resource']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database insertion error: ' . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred: ' . $e->getMessage()]);
}

$db = null;
?>
