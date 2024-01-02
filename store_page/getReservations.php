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
$sql = "SELECT Cars.brand, Cars.price_per_day, Cars.car_image, reservations.pickup_date, reservations.return_date, reservations.reservation_id, reservations.status
        FROM Cars
        INNER JOIN reservations ON Cars.car_id = reservations.car_id
        WHERE reservations.customer_id = ?";

// Prepare the statement
$stmt = $conn->prepare($sql);

// Bind the parameter
$stmt->bind_param("i", $receivedID);

// Execute the statement
$stmt->execute();

// Get the result
$result = $stmt->get_result();

// Initialize an array to store car data
$cardsData = array();






if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $pickupDate = new DateTime($row['pickup_date']);
        $returnDate = new DateTime($row['return_date']);
        $pricePerDay = intval($row['price_per_day']);
        $daysDiff = $pickupDate->diff($returnDate)->days;
        $totalPrice = $daysDiff * $pricePerDay;

        $carData = array(
        'name' => $row['brand'],
        'price' => $totalPrice,
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
