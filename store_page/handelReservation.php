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

// Bind the result variables
$stmt->bind_result($status, $carId);

// Fetch the result
$stmt->fetch();
$stmt->close();
// Initialize an array to store car data


if ($status === "reserved") {
    $sql3 = "UPDATE reservations
             SET `status` = 'picked_up'
             WHERE reservation_id = ?";

    // Prepare the statement
    

    if (!$conn->prepare($sql3)) {
        die("Error in preparing statement: " . $conn->error);
    }
    $stmt3 = $conn->prepare($sql3);
    // Bind the parameter
    $stmt3->bind_param("i", $receivedID);

    // Execute the statement
    if (!$stmt3->execute()) {
        die("Error in executing statement: " . $stmt3->error);
    }

    // Close the statement
    $stmt3->close();
}



elseif ($status === "picked_up"){


$sql3 = "UPDATE reservations
            SET `status` = 'returned'
            WHERE reservation_id = ?";

// Prepare the statement


if (!$conn->prepare($sql3)) {
    die("Error in preparing statement: " . $conn->error);
}
$stmt3 = $conn->prepare($sql3);
// Bind the parameter
$stmt3->bind_param("i", $receivedID);

// Execute the statement
if (!$stmt3->execute()) {
    die("Error in executing statement: " . $stmt3->error);
}

// Close the statement
$stmt3->close();



$sqlCar = "UPDATE Cars
    SET `status` = 'active'
    WHERE car_id = ? ";

if (!$conn->prepare($sqlCar)) {
    die("Error in preparing statement: " . $conn->error);
}
$stmtCar = $conn->prepare($sqlCar);
// Bind the parameter
$stmtCar->bind_param("i",$carId);

// Execute the statement
if (!$stmtCar->execute()) {
    die("Error in executing statement: " . $stmtCar->error);
}

// Close the statement
$stmtCar->close();


}


// Close the statement




// Close the connection
$conn->close();

?>
