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
    echo json_encode(['error' => 'Invalid request method. Use POST to add FAQ.']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

// Check if required fields are present
if (!isset($input['question']) || !isset($input['answer'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Question and answer are required fields']);
    exit;
}

// Validate required fields are not empty
if (empty(trim($input['question'])) || empty(trim($input['answer']))) {
    http_response_code(400);
    echo json_encode(['error' => 'Question and answer cannot be empty']);
    exit;
}

// Sanitize input data
$question = htmlspecialchars(trim($input['question']), ENT_QUOTES, 'UTF-8');
$answer = htmlspecialchars(trim($input['answer']), ENT_QUOTES, 'UTF-8');
$category = isset($input['category']) ? htmlspecialchars(trim($input['category']), ENT_QUOTES, 'UTF-8') : 'General';

// Validate question length
if (strlen($question) > 500) {
    http_response_code(400);
    echo json_encode(['error' => 'Question must be less than 500 characters']);
    exit;
}

// Validate answer length
if (strlen($answer) > 5000) {
    http_response_code(400);
    echo json_encode(['error' => 'Answer must be less than 5000 characters']);
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
    $tableCheck = $db->query("SHOW TABLES LIKE 'faq_questions'");
    if ($tableCheck->rowCount() === 0) {
        // Create the table if it doesn't exist
        $createTable = "CREATE TABLE faq_questions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            category VARCHAR(100) DEFAULT 'General',
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

// Check if the question already exists (avoid duplicates)
try {
    $stmt = $db->prepare("SELECT id FROM faq_questions WHERE question = ?");
    $stmt->execute([$question]);

    if ($stmt->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(['error' => 'This question already exists in the FAQ']);
        exit;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database query error: ' . $e->getMessage()]);
    exit;
}

// Insert the new FAQ question
try {
    $stmt = $db->prepare("INSERT INTO faq_questions (question, answer, category) VALUES (?, ?, ?)");
    $result = $stmt->execute([$question, $answer, $category]);

    if ($result) {
        $newId = $db->lastInsertId();

        // Get the newly created FAQ entry
        $stmt = $db->prepare("SELECT * FROM faq_questions WHERE id = ?");
        $stmt->execute([$newId]);
        $newFaq = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'message' => 'FAQ question added successfully',
            'id' => $newId,
            'data' => $newFaq
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to insert FAQ question']);
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
