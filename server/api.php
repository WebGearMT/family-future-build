<?php
// Handle CORS
header("Access-Control-Allow-Origin: https://app.gottabenc.com, http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'db_connect.php';

// Check if database connection is available
if (!$conn) {
    http_response_code(500);
    die(json_encode(["message" => "Database connection failed"]));
}

// Get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'), true);

// Retrieve the table and key from the path
$table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request);

// Escape the columns and values from the input object
$columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
$values = array_map(function ($value) use ($conn) {
    if ($value === null) return null;
    return $conn->quote((string)$value);
}, array_values($input));

// Build the SET part of the SQL command
$set = '';
for ($i = 0; $i < count($columns); $i++) {
    $set .= ($i > 0 ? ',' : '') . '`' . $columns[$i] . '`=';
    $set .= ($values[$i] === null ? 'NULL' : '"' . $values[$i] . '"');
}


$input = json_decode(file_get_contents('php://input'), true);
$jsonData = json_encode($input);

// Create SQL based on HTTP method
switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM `$table`" . ($key ? " WHERE id=$key" : '');
        break;
        
    case 'PUT':
        
        $sql = "UPDATE `$table` SET `data`=? WHERE id=?";
                
        break;
        
    case 'POST':
        $sql = "INSERT INTO `$table` (`data`) VALUES (?)";
        
        break;
        
    case 'DELETE':
        $sql = "DELETE FROM `$table` WHERE id=$key";
        break;
}

// Execute SQL statement
$result = $conn->prepare($sql);
$result->execute([$jdonData]);
// Die if SQL statement failed
if (!$result) {
    http_response_code(500);
    die(json_encode(["message" => $conn->error]));
}

// Print results, insert id or affected row count
if ($method === 'GET' || $method === 'DELETE') {
    $result = $conn->query($sql);
    
    if (!$result) {
        http_response_code(500);
        die(json_encode(["message" => "Database error"]));
    }
    
    if ($method === 'GET') {
        $rows = $result->fetchAll(PDO::FETCH_ASSOC);
        // Decode JSON data for each row
        foreach ($rows as &$row) {
            if (isset($row['data'])) {
                $row['data'] = json_decode($row['data'], true);
            }
        }
        echo json_encode($rows);
    }
} else {
    // POST and PUT already executed via prepared statements
    if ($method === 'POST') {
        echo json_encode(["id" => $conn->lastInsertId(), "message" => "Created successfully"]);
    } else {
        echo json_encode(["message" => "Updated successfully"]);
    }
}

// Print results, insert id or affected row count
// Close MySQL connection
$conn = null;
?>
