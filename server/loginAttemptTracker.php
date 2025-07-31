<?php
class LoginAttemptTracker {
    private $pdo;
    private $maxAttempts = 5;
    private $lockoutDuration = 900; // 15 minutes in seconds

    public function __construct($pdo) {
        $this->pdo = $pdo;
        $this->ensureTableExists();
    }

    private function ensureTableExists() {
        try {
            // Check if the table exists and create it if it doesn't
            $stmt = $this->pdo->prepare("
                CREATE TABLE IF NOT EXISTS login_attempts (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    ip_address VARCHAR(45) NOT NULL,
                    username VARCHAR(255) NOT NULL,
                    success BOOLEAN NOT NULL DEFAULT FALSE,
                    attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_username_ip (username, ip_address),
                    INDEX idx_attempt_time (attempt_time)
                )
            ");
            $stmt->execute();
        } catch (Exception $e) {
            error_log('Error creating login_attempts table: ' . $e->getMessage());
        }
    }

    public function recordAttempt($username, $ipAddress, $success = false) {
        try {
            $stmt = $this->pdo->prepare("
                INSERT INTO login_attempts (ip_address, username, success)
                VALUES (?, ?, ?)
            ");
            $stmt->execute([$ipAddress, $username, $success]);
        } catch (Exception $e) {
            error_log('Error recording login attempt: ' . $e->getMessage());
            throw $e; // Re-throw to let calling code handle it
        }
    }

    public function getFailedAttempts($username, $ipAddress) {
        try {
            $stmt = $this->pdo->prepare("
                SELECT COUNT(*) as attempts
                FROM login_attempts
                WHERE (username = ? OR ip_address = ?)
                AND success = FALSE
                AND attempt_time > DATE_SUB(NOW(), INTERVAL ? SECOND)
            ");
            $stmt->execute([$username, $ipAddress, $this->lockoutDuration]);
            return $stmt->fetchColumn();
        } catch (Exception $e) {
            error_log('Error getting failed attempts: ' . $e->getMessage());
            return 0; // Return 0 if there's an error to prevent blocking legitimate users
        }
    }

    public function isBlocked($username, $ipAddress) {
        $attempts = $this->getFailedAttempts($username, $ipAddress);
        return $attempts >= $this->maxAttempts;
    }

    public function getRemainingLockoutTime($username, $ipAddress) {
        try {
            $stmt = $this->pdo->prepare("
                SELECT GREATEST(0, TIMESTAMPDIFF(SECOND, NOW(), DATE_ADD(MAX(attempt_time), INTERVAL ? SECOND))) as remaining
                FROM login_attempts
                WHERE (username = ? OR ip_address = ?)
                AND success = FALSE
                AND attempt_time > DATE_SUB(NOW(), INTERVAL ? SECOND)
            ");
            $stmt->execute([$this->lockoutDuration, $username, $ipAddress, $this->lockoutDuration]);
            $remaining = $stmt->fetchColumn();
            return max(0, (int)$remaining);
        } catch (Exception $e) {
            error_log('Error getting remaining lockout time: ' . $e->getMessage());
            return 0; // Return 0 if there's an error
        }
    }

    public function clearAttempts($username, $ipAddress) {
        try {
            // Mark successful login
            $this->recordAttempt($username, $ipAddress, true);

            // Optional: Clean old failed attempts
            $stmt = $this->pdo->prepare("
                DELETE FROM login_attempts
                WHERE (username = ? OR ip_address = ?)
                AND success = FALSE
                AND attempt_time < DATE_SUB(NOW(), INTERVAL ? SECOND)
            ");
            $stmt->execute([$username, $ipAddress, $this->lockoutDuration]);
        } catch (Exception $e) {
            error_log('Error clearing login attempts: ' . $e->getMessage());
            // Don't re-throw here as this is cleanup code
        }
    }
}
