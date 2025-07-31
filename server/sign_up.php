<?php
require_once 'db_connect.php'; // Include database connection file
// Handle CORS
header("Access-Control-Allow-Origin: https://app.gottabenc.com, http://localhost:3000"); // Adjust the origin as needed
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Invalid request method. Use POST to sign up.']);
    exit;
}

// file.php
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the request is coming from a form submission
    if (!isset($_POST['email']) ||
    !isset($_POST['firstName']) ||
    !isset($_POST['lastName']) ||
    !isset($_POST['password']) ||
    !isset($_POST['confirmPassword'])) {
        echo json_encode(['error' => 'Invalid form submission']);
        exit;
    } else {
        $data = [
            'email' => $_POST['email'],
            'firstName' => $_POST['firstName'],
            'lastName' => $_POST['lastName'],
            'password' => $_POST['password'],
            'confirmPassword' => $_POST['confirmPassword']
        ];

        $json_string = json_encode($data);

    }
}

// Connect to the database
$conn = connect(); // Call the connect function from db_connect.php

if (!$conn) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$userTable = 'users'; // Define the table name
// Check if the table exists
try {
    $tableCheck = $conn->query("SHOW TABLES LIKE 'users'");
    $tableExists = $tableCheck->fetchColumn();

    if (!$tableExists) {
        echo json_encode(['error' => 'User table does not exist']);
        exit;
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    exit;
}

// Check if the required fields are present
if (!isset($_POST['email'])
    || !isset($data['firstName'])
    || !isset($data['lastName'])
    || !isset($data['password'])
    || !isset($data['confirmPassword'])
    ) {
    echo json_encode(['error' => 'Email and password are required']);
    exit;
} else if (empty($_POST['email'])
    || empty($data['firstName'])
    || empty($data['lastName'])
    || empty($data['password'])
    || empty($data['confirmPassword'])
    ) {
    echo json_encode(['error' => 'Email and password cannot be empty']);
    exit;
} else {
    // Sanitize input data
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;
    $email = htmlspecialchars(trim($data['email'] ?? ''), ENT_QUOTES, 'UTF-8');
    $firstName = htmlspecialchars(trim($data['firstName'] ?? ''), ENT_QUOTES, 'UTF-8');
    $lastName = htmlspecialchars(trim($data['lastName'] ?? ''), ENT_QUOTES, 'UTF-8');
    $password = $data['password'] ?? ''; // Don't sanitize passwords - just validate them
    $confirmPassword = $data['confirmPassword'] ?? '';
}

// Validate password requirements
$passwordErrors = [];
if (strlen($password) < 8) {
    $passwordErrors[] = 'Must be at least 8 characters long';
}
if (!preg_match('/[A-Z]/', $password)) {
    $passwordErrors[] = 'Must contain at least one uppercase letter';
}
if (!preg_match('/[a-z]/', $password)) {
    $passwordErrors[] = 'Must contain at least one lowercase letter';
}
if (!preg_match('/\d/', $password)) {
    $passwordErrors[] = 'Must contain at least one number';
}
if (!preg_match('/[^a-zA-Z0-9]/', $password)) {
    $passwordErrors[] = 'Must contain at least one special character';
}
if ($password !== $_POST['confirmPassword']) {
    $passwordErrors[] = 'Passwords do not match';
}

if (!empty($passwordErrors)) {
    echo json_encode([
        'error' => 'Password requirements not met',
        'validationErrors' => $passwordErrors
    ]);
    exit;
}

// Hash the password
$hashed_pass = password_hash($password, PASSWORD_DEFAULT);

// Build JSON object
$jsonData = json_encode([
    'email' => $email,
    'firstName' => $firstName,
    'lastName' => $lastName,
    'password' => $hashed_pass
]);

try {
    // Check if user already exists
    
    $checkStmt = $conn->prepare("SELECT * FROM users WHERE JSON_UNQUOTE(JSON_EXTRACT(data, '$.email')) = :email");
    $checkStmt->bindParam(':email', $email, PDO::PARAM_STR);
    $checkStmt->execute();
    $userExists = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if ($userExists > 0) {
        echo json_encode(['error' => 'User with this email already exists']);
        exit;
    }

    // Prepare the SQL statement
    $stmt = $conn->prepare("INSERT INTO users (data) VALUES (:data)");
    $stmt->bindParam(':data', $jsonData, PDO::PARAM_STR);
    $result = $stmt->execute();

    if ($result && $stmt->rowCount() > 0) {
        echo json_encode([
            'success' => true,
            'message' => 'User created successfully',
            'user_id' => $conn->lastInsertId()
        ]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to insert user']);
    }

} catch (PDOException $e) {
    // Handle database errors
    error_log('Database error in sign_up.php: ' . $e->getMessage());
    echo json_encode(['error' => 'Database error occurred']);
} catch (Exception $e) {
    // Handle other errors
    echo json_encode(['error' => 'An error occurred: ' . $e->getMessage()]);
}

$conn = null;
$stmt = null;

?>
