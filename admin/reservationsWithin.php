<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rentx";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get filter values from the AJAX request
$data = json_decode(file_get_contents("php://input"), true);

// Get start and end dates
$startDate = isset($data['startDate']) ? $data['startDate'] : '';
$endDate = isset($data['endDate']) ? $data['endDate'] : '';

// Build the SQL query to fetch reservations within the specified period
$sql = "
    SELECT
        Reservations.reservation_id,
        Reservations.car_id,
        Reservations.customer_id,
        Reservations.reservation_date,
        Reservations.pickup_date,
        Reservations.return_date,
        Reservations.status AS reservation_status,
        Cars.model AS car_model,
        Cars.brand AS car_brand,
        Customers.name AS customer_name,
        Customers.email AS customer_email
    FROM Reservations
    LEFT JOIN Cars ON Reservations.car_id = Cars.car_id
    LEFT JOIN Customers ON Reservations.customer_id = Customers.customer_id
    WHERE (Reservations.pickup_date BETWEEN '$startDate' AND '$endDate')
    OR (Reservations.return_date BETWEEN '$startDate' AND '$endDate')
";

// Execute the query
$result = $conn->query($sql);

// Check for errors
if (!$result) {
    die("Error executing query: " . $conn->error);
}

// Fetch data
$reservationsData = array();
while ($row = $result->fetch_assoc()) {
    $reservationInfo = array(
        'reservation_id' => $row['reservation_id'],
        'car_id' => $row['car_id'],
        'customer_id' => $row['customer_id'],
        'reservation_date' => $row['reservation_date'],
        'pickup_date' => $row['pickup_date'],
        'return_date' => $row['return_date'],
        'reservation_status' => $row['reservation_status'],
        'car_model' => $row['car_model'],
        'car_brand' => $row['car_brand'],
        'customer_name' => $row['customer_name'],
        'customer_email' => $row['customer_email']
    );

    array_push($reservationsData, $reservationInfo);
}

// Close the connection
$conn->close();

// Return JSON response
echo json_encode($reservationsData);
?>
