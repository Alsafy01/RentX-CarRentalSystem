<?php
// Replace these variables with your actual database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rentx";
// Retrieve email and password from the POST request



$conn = new mysqli($servername, $username, $password, $dbname);

$email = $_POST['email'];
$password = $_POST['password'];


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// TODO: Use prepared statements to prevent SQL injection
$sql = "SELECT * FROM customers WHERE email = '$email' AND password = '$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $conn->close();
	header("Location: /Rentx-CarRentalSystem/store_page/rent.html");
	exit();
} else {
    // Authentication failed
    header("Location: Login.html");
}

// Close the database connection
$conn->close();
?>
