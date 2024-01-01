<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rentx";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Use prepared statement to prevent SQL injection
$sql = "SELECT Cars.*, reservations.reservation_id
        FROM Cars
        INNER JOIN reservations ON Cars.car_id = reservations.car_id";

// Prepare the statement
$stmt = $conn->prepare($sql);

// Execute the statement
$stmt->execute();

// Get the result
$result = $stmt->get_result();

// Initialize an array to store car data
$cardsData = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $carData = array(
            'name' => $row['brand'],
            'price' => intval($row['price_per_day']),
            'status' => $row['status'],
            'imageUrl' => 'data:image/jpeg;base64,' . base64_encode($row['car_image']),
            'reservationId' => intval($row['reservation_id'])
        );

        array_push($cardsData, $carData);
    }
}

// Close the statement
$stmt->close();

// Close the connection
$conn->close();

// Output JSON
echo json_encode($cardsData);
?>
