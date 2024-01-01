<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rentx";

$conn = new mysqli($servername, $username, $password, $dbname);

// Get the raw POST data
$postData = file_get_contents('php://input');

// Decode the JSON data
$requestData = json_decode($postData, true);

// Check if the variable is set in the received data
if (isset($requestData['variable'])) {
    $receivedID = $requestData['variable'];
}

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Use prepared statement to prevent SQL injection
$sql = "SELECT  reservations.status, reservations.car_id
        FROM reservations
        WHERE reservation_id = ?";

// Prepare the statement
$stmt = $conn->prepare($sql);

// Bind the parameter
$stmt->bind_param("i", $receivedID);

// Execute the statement
$stmt->execute();

// Get the result
$result = $stmt->get_result();

// Initialize an array to store car data

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc()
    
    
    
    
    if ( $row['status'] === "reserved"){
       
       $sql1 = "UPDATE reservations
        SET status = 'picked_up'
        WHERE reservation_id = ?";

        // Prepare the statement
        $stmt1 = $conn->prepare($sql1);

        // Bind the parameter
        $stmt1->bind_param("i", $receivedID);

        // Execute the statement
        $stmt1->execute();
   }

   
   
   elseif ($row['status'] === "picked_up"){
    
    $sql1 = "UPDATE car
            SET status = 'active'
            WHERE car_id = ? ";

    // Prepare the statement
    $stmt1 = $conn->prepare($sql1);

    // Bind the parameter
    $stmt1->bind_param("i", $row['car_id']);

    // Execute the statement
    $stmt1->execute();


    $sql2 = "UPDATE reservations
            SET status = 'returned'
            WHERE reservation_id = ?";

    // Prepare the statement
    $stmt2 = $conn->prepare($sql1);

    // Bind the parameter
    $stmt2->bind_param("i", $receivedID);

    // Execute the statement
    $stmt2->execute();

   }
}

// Close the statement
$stmt->close();
$stmt1->close();
$stmt2->close();

// Close the connection
$conn->close();

?>
