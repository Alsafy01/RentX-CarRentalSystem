<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rentx";

$conn = new mysqli($servername, $username, $password, $dbname);
// Get the raw POST data
$data = json_decode(file_get_contents("php://input"));

// Access car_id and status
$car_id = $data->car_id;
$status = $data->status;

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Use prepared statement to prevent SQL injection
if ($status === "active"){
$sql = "UPDATE Cars
SET `status` = 'out_of_service'
WHERE car_id = ? ";

// Prepare the statement
$stmt = $conn->prepare($sql);

// Bind the parameter
$stmt->bind_param("i", $car_id);

// Execute the statement
$stmt->execute();

$stmt->close();
}
elseif ($status === "out_of_service"){
    $sql = "UPDATE Cars
    SET `status` = 'active'
    WHERE car_id = ? ";
    
    // Prepare the statement
    $stmt = $conn->prepare($sql);
    
    // Bind the parameter
    $stmt->bind_param("i", $car_id);
    
    // Execute the statement
    $stmt->execute();
    
    $stmt->close();
    }

// Close the connection
$conn->close();


?>
