<?php
// Handle CORS
header("Access-Control-Allow-Origin: https://app.gottabenc.com, https://api.qrserver.com http://localhost:8080, http://localhost:3306");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


class GoogleAuthenticator {
    private $codeLength = 6;
    
    /**
     * Generate a random secret key for the user
     */
    public function generateSecret($length = 16) {
        $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        $secret = '';
        for ($i = 0; $i < $length; $i++) {
            $secret .= $chars[random_int(0, strlen($chars) - 1)];
        }
        return $secret;
    }
    
    /**
     * Generate QR code URL for Google Authenticator
     */
    public function getQRCodeUrl($secret, $title, $issuer = 'Your App') {
        $urlencoded = urlencode("otpauth://totp/{$title}?secret={$secret}&issuer={$issuer}");
        return "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data={$urlencoded}";
    }
    
    /**
     * Verify the code entered by user
     */
    public function verifyCode($secret, $code, $discrepancy = 1) {
        $currentTimeSlice = floor(time() / 30);
        
        for ($i = -$discrepancy; $i <= $discrepancy; $i++) {
            $calculatedCode = $this->getCode($secret, $currentTimeSlice + $i);
            if ($this->timingSafeEquals($calculatedCode, $code)) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Generate TOTP code for given secret and time slice
     */
    private function getCode($secret, $timeSlice) {
        $secretkey = $this->base32Decode($secret);
        $time = chr(0).chr(0).chr(0).chr(0).pack('N*', $timeSlice);
        $hm = hash_hmac('SHA1', $time, $secretkey, true);
        $offset = ord(substr($hm, -1)) & 0x0F;
        $hashpart = substr($hm, $offset, 4);
        $value = unpack('N', $hashpart);
        $value = $value[1];
        $value = $value & 0x7FFFFFFF;
        $modulo = pow(10, $this->codeLength);
        return str_pad($value % $modulo, $this->codeLength, '0', STR_PAD_LEFT);
    }
    
    /**
     * Base32 decode function
     */
    private function base32Decode($secret) {
        if (empty($secret)) return '';
        
        $base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        $base32charsArray = str_split($base32chars);
        $base32charsFlipped = array_flip($base32charsArray);
        
        $paddingCharCount = substr_count($secret, '=');
        $allowedValues = array(6, 4, 3, 1, 0);
        if (!in_array($paddingCharCount, $allowedValues)) return false;
        
        for ($i = 0; $i < 4; $i++) {
            if ($paddingCharCount == $allowedValues[$i] &&
                substr($secret, -($allowedValues[$i])) != str_repeat('=', $allowedValues[$i])) return false;
        }
        
        $secret = str_replace('=', '', $secret);
        $secret = str_split($secret);
        $binaryString = '';
        
        for ($i = 0; $i < count($secret); $i = $i + 8) {
            $x = '';
            if (!in_array($secret[$i], $base32charsArray)) return false;
            for ($j = 0; $j < 8; $j++) {
                $x .= str_pad(base_convert(@$base32charsFlipped[@$secret[$i + $j]], 10, 2), 5, '0', STR_PAD_LEFT);
            }
            $eightBits = str_split($x, 8);
            for ($z = 0; $z < count($eightBits); $z++) {
                $binaryString .= (($y = chr(base_convert($eightBits[$z], 2, 10))) || ord($y) == 48) ? $y : '';
            }
        }
        return $binaryString;
    }
    
    /**
     * Timing safe string comparison
     */
    private function timingSafeEquals($str1, $str2) {
        if (strlen($str1) != strlen($str2)) {
            return false;
        }
        $result = 0;
        for ($i = 0; $i < strlen($str1); $i++) {
            $result |= ord($str1[$i]) ^ ord($str2[$i]);
        }
        return $result === 0;
    }
}

// Database connection (adjust according to your setup)
class Database {
    private $pdo;
    
    public function __construct($host, $dbname, $username, $password) {
        try {
            $this->pdo = new PDO("mysql:host={$host};dbname={$dbname}", $username, $password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }
    
    public function getUserByEmail($email) {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    public function updateUser2FASecret($userId, $secret) {
        $stmt = $this->pdo->prepare("UPDATE users SET two_factor_secret = ? WHERE id = ?");
        return $stmt->execute([$secret, $userId]);
    }
    
    public function enable2FA($userId) {
        $stmt = $this->pdo->prepare("UPDATE users SET two_factor_enabled = 1 WHERE id = ?");
        return $stmt->execute([$userId]);
    }
    
    public function disable2FA($userId) {
        $stmt = $this->pdo->prepare("UPDATE users SET two_factor_enabled = 0, two_factor_secret = NULL WHERE id = ?");
        return $stmt->execute([$userId]);
    }
}

// 2FA Handler Class
class TwoFactorAuth {
    private $db;
    private $authenticator;
    
    public function __construct(Database $db) {
        $this->db = $db;
        $this->authenticator = new GoogleAuthenticator();
    }
    
    /**
     * Setup 2FA for user
     */
    public function setup2FA($userId, $userEmail) {
        $secret = $this->authenticator->generateSecret();
        $this->db->updateUser2FASecret($userId, $secret);
        
        $qrCodeUrl = $this->authenticator->getQRCodeUrl($secret, $userEmail, 'Your App Name');
        
        return [
            'secret' => $secret,
            'qr_code_url' => $qrCodeUrl
        ];
    }
    
    /**
     * Verify 2FA code and enable 2FA for user
     */
    public function verify2FASetup($userId, $code) {
        $user = $this->db->getUserById($userId);
        if (!$user || !$user['two_factor_secret']) {
            return false;
        }
        
        if ($this->authenticator->verifyCode($user['two_factor_secret'], $code)) {
            $this->db->enable2FA($userId);
            return true;
        }
        return false;
    }
    
    /**
     * Verify 2FA code during login
     */
    public function verifyLogin2FA($userId, $code) {
        $user = $this->db->getUserById($userId);
        if (!$user || !$user['two_factor_enabled'] || !$user['two_factor_secret']) {
            return false;
        }
        
        return $this->authenticator->verifyCode($user['two_factor_secret'], $code);
    }
}

// Example usage and API endpoints
session_start();

// Initialize database (adjust credentials)
$db = new Database('localhost', 'your_database', 'username', 'password');
$twoFA = new TwoFactorAuth($db);

// Handle different actions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $action = $input['action'] ?? '';
    
    switch ($action) {
        case 'setup_2fa':
            if (!isset($_SESSION['user_id'])) {
                http_response_code(401);
                echo json_encode(['error' => 'Not authenticated']);
                exit;
            }
            
            $userId = $_SESSION['user_id'];
            $userEmail = $_SESSION['user_email'];
            
            $setup = $twoFA->setup2FA($userId, $userEmail);
            echo json_encode([
                'success' => true,
                'secret' => $setup['secret'],
                'qr_code_url' => $setup['qr_code_url']
            ]);
            break;
            
        case 'verify_2fa_setup':
            if (!isset($_SESSION['user_id'])) {
                http_response_code(401);
                echo json_encode(['error' => 'Not authenticated']);
                exit;
            }
            
            $userId = $_SESSION['user_id'];
            $code = $input['code'] ?? '';
            
            if ($twoFA->verify2FASetup($userId, $code)) {
                echo json_encode(['success' => true, 'message' => '2FA enabled successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid code']);
            }
            break;
            
        case 'verify_login_2fa':
            if (!isset($_SESSION['temp_user_id'])) {
                http_response_code(401);
                echo json_encode(['error' => 'No pending authentication']);
                exit;
            }
            
            $userId = $_SESSION['temp_user_id'];
            $code = $input['code'] ?? '';
            
            if ($twoFA->verifyLogin2FA($userId, $code)) {
                // Move from temp session to actual session
                $_SESSION['user_id'] = $_SESSION['temp_user_id'];
                $_SESSION['user_email'] = $_SESSION['temp_user_email'];
                unset($_SESSION['temp_user_id'], $_SESSION['temp_user_email']);
                
                echo json_encode(['success' => true, 'message' => 'Login successful']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid 2FA code']);
            }
            break;
            
        case 'login':
            $email = $input['email'] ?? '';
            $password = $input['password'] ?? '';
            
            // Verify email and password (implement your own password verification)
            $user = $db->getUserByEmail($email);
            
            if ($user && password_verify($password, $user['password'])) {
                if ($user['two_factor_enabled']) {
                    // Store user info temporarily until 2FA is verified
                    $_SESSION['temp_user_id'] = $user['id'];
                    $_SESSION['temp_user_email'] = $user['email'];
                    
                    echo json_encode([
                        'success' => true,
                        'requires_2fa' => true,
                        'message' => 'Please enter your 2FA code'
                    ]);
                } else {
                    // Normal login without 2FA
                    $_SESSION['user_id'] = $user['id'];
                    $_SESSION['user_email'] = $user['email'];
                    
                    echo json_encode([
                        'success' => true,
                        'requires_2fa' => false,
                        'message' => 'Login successful'
                    ]);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
            }
            break;
            
        default:
            http_response_code(400);
            echo json_encode(['error' => 'Invalid action']);
            break;
    }
} else {
    // Handle GET requests or show forms
    echo json_encode(['message' => 'Send POST requests to interact with 2FA system']);
}

/*
SQL Table Structure:
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    two_factor_secret VARCHAR(32),
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/
?>