<?php
session_start();

// Unset all session variables
$_SESSION = array();

// Destroy the session
session_destroy();

// Send a response (you can customize the response if needed)
echo "Logout successful";
?>
