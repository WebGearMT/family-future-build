<?php
// Handle CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Turn off error display to prevent database errors from showing to users
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Set custom error handler to catch any uncaught errors
set_error_handler(function($severity, $message, $file, $line) {
    error_log("PHP Error in $file:$line - $message");
    if (!headers_sent()) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'An error occurred. Please try again later.']);
    }
    exit;
});

// Set exception handler for uncaught exceptions
set_exception_handler(function($exception) {
    error_log("Uncaught exception: " . $exception->getMessage() . " in " . $exception->getFile() . ":" . $exception->getLine());
    if (!headers_sent()) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'An error occurred. Please try again later.']);
    }
    exit;
});

require_once 'db_connect.php';


// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Invalid request method. Use POST to login.']);
    exit;
}

// Check if the required fields are present
if (!isset($_POST['email']) || !isset($_POST['password'])) {
    echo json_encode(['error' => 'Email and password are required']);
    exit;
} else if (empty($_POST['email']) || empty($_POST['password'])) {
    echo json_encode(['error' => 'Email and password cannot be empty']);
    exit;
} else {
    // Build data object
    $data = [
        'email' => $_POST['email'],
        'password' => $_POST['password']
    ];
    // Sanitize input data
    $email = htmlspecialchars(trim($data['email'] ?? ''), ENT_QUOTES, 'UTF-8');
    $password = $data['password'] ?? ''; // Don't sanitize passwords - just validate them
}

try {
    // Establish database connection

    if (!$conn) {
        throw new Exception('Database connection failed');
    }

   // Prepare the SQL statement to find user by email
	$stmt = $conn->prepare("SELECT userID, data FROM users WHERE JSON_EXTRACT(data, '$.email') = ? LIMIT 1");

	// Bind the email parameter
	$stmt->bindParam(1, $email, PDO::PARAM_STR);
        

	// Execute the query
	$stmt->execute();

	// Fetch the user record
	$user = $stmt->fetch(PDO::FETCH_ASSOC);
	$userID = $user['userID'];
	// Extract and verify the data
	if ($user) {
	   $userData = json_decode($user['data'], true);
    
	    // Now verify the password
	    if ($userData['email'] === $email && password_verify($password, $userData['password'])) {
	        // Password is correct, login successful
	        session_start(); // Start session for user authentication
        
	        // Store user information in session
	        $_SESSION['user_id'] = $userID;
	        $_SESSION['user_email'] = $userData['email'];
	        $_SESSION['logged_in'] = true;

                $ipAddress = $_SERVER['REMOTE_ADDR'];

	        // Record successful login attempt
	        try {
                    require_once 'loginAttemptTracker.php';
                    $loginAttemptTracker = new LoginAttemptTracker($conn);
	            $loginAttemptTracker->recordAttempt($email, $ipAddress, true);
	        } catch (Exception $e) {
	            error_log('Error recording successful login attempt: ' . $e->getMessage());
	        }

	        // Optional: Update last login timestamp
                
	        $updateStmt = $conn->prepare("UPDATE users SET lastLogin = NOW() WHERE userID = :user_id");
	        $updateStmt->bindParam(':user_id', $userID, PDO::PARAM_INT);
	        $updateStmt->execute();

	        echo json_encode([
	            'success' => true,
	            'message' => 'Login successful',
	            'user' => [
	                'id' => $user['userID'],
	                'email' => $userData['email']
	            ]
	        ]);
	    } else {
	        // Password is incorrect
	        try {
	            $loginAttemptTracker->recordAttempt($email, $ipAddress, false);
	            if ($loginAttemptTracker->isBlocked($email, $ipAddress)) {
	                $remainingTime = $loginAttemptTracker->getRemainingLockoutTime($email, $ipAddress);
	                echo json_encode([
	                    'success' => false,
	                    'error' => 'Too many failed attempts. Please try again after ' . $remainingTime . ' seconds.'
	                ]);
	                exit;
	            } else {
	                echo json_encode([
	                    'success' => false,
	                    'error' => 'Invalid email or password'
	                ]);
	                exit;
	            }
	        } catch (Exception $e) {
	            error_log('Error handling failed login attempt: ' . $e->getMessage());
	            echo json_encode([
	                'success' => false,
	                'error' => 'Invalid email or password'
	            ]);
	            exit;
	        }
	    }
	} else {
	    // User not found - record failed attempt
	    try {
	        $loginAttemptTracker->recordAttempt($email, $ipAddress, false);
	        if ($loginAttemptTracker->isBlocked($email, $ipAddress)) {
	            $remainingTime = $loginAttemptTracker->getRemainingLockoutTime($email, $ipAddress);
	            echo json_encode([
	                'success' => false,
	                'error' => 'Too many failed attempts. Please try again after ' . $remainingTime . ' seconds.'
	            ]);
	            exit;
	        } else {
	            echo json_encode([
	                'success' => false,
	                'error' => 'Invalid email or password'
	            ]);
	            exit;
	        }
	    } catch (Exception $e) {
	        error_log('Error recording failed login attempt: ' . $e->getMessage());
	        echo json_encode([
	            'success' => false,
	            'error' => 'Invalid email or password'
	        ]);
	        exit;
	    }
	}

} catch (PDOException $e) {
    // Handle database errors
    error_log('Database error in login.php: ' . $e->getMessage());
    echo json_encode([
        'success' => false,
        'error' => 'Database connection error. Please try again later.'
    ]);
} catch (PDOException $e) {
    // Handle other errors
    error_log('General error in login.php: ' . $e->getMessage());
    echo json_encode([
        'success' => false,
        'error' => 'An error occurred. Please try again later.'
    ]);
}
