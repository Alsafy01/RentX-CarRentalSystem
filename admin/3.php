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

// Build the base SQL query
$sql = "
    SELECT
        Cars.car_id AS car_id,
        Cars.model AS car_model,
        Cars.brand AS car_brand,
        Cars.year AS car_year,
        Cars.plate_id AS car_plate_id,
        Cars.status AS car_status,
        Cars.price_per_day AS car_price_per_day,
        Cars.body_shape AS car_body_shape,
        Cars.color AS car_color,
        Cars.car_image AS car_image,
        Customers.customer_id AS customer_id,
        Customers.name AS customer_name,
        Customers.email AS customer_email,
        Customers.birth_date AS customer_birth_date,
        Customers.gender AS customer_gender,
        Customers.phone AS customer_phone,
        Customers.address AS customer_address,
        Reservations.reservation_id AS reservation_id,
        Reservations.reservation_date AS reservation_date,
        Reservations.pickup_date AS pickup_date,
        Reservations.return_date AS return_date,
        Reservations.status AS reservation_status,
        Reservations.pickup_location AS reservation_pickup_location
    FROM Cars
    LEFT JOIN Reservations ON Cars.car_id = Reservations.car_id
    LEFT JOIN Customers ON Reservations.customer_id = Customers.customer_id
";

// Check if there are any filters provided
if (!empty($data)) {
    $whereConditions = array();


    if (!empty($data['carIdFilter'])) {
        $whereConditions[] = "LOWER(plate_id) LIKE '%" . $conn->real_escape_string($data['carIdFilter']) . "%'";
    }

    if (!empty($data['startDate']) || !empty($data['endDate'])) {
        $reservationConditions = array();

        if (!empty($data['startDate'])) {
            $reservationConditions[] = "Reservations.reservation_date >= '" . $conn->real_escape_string($data['startDate']) . "'";
        }

        if (!empty($data['endDate'])) {
            $reservationConditions[] = "Reservations.reservation_date <= '" . $conn->real_escape_string($data['endDate']) . "'";
        }

        $whereConditions[] = "(" . implode(" AND ", $reservationConditions) . ")";
    }

    // Construct the WHERE clause if there are filters
    if (!empty($whereConditions)) {
        $sql .= " WHERE " . implode(" AND ", $whereConditions);
    }
}

// Execute the query
$result = $conn->query($sql);

// Check for errors
if (!$result) {
    die("Error executing query: " . $conn->error);
}

// Fetch data
$filteredData = array();
while ($row = $result->fetch_assoc()) {
    $carData = array(
        'car_id' => $row['car_id'],
        'car_model' => $row['car_model'],
        'car_brand' => $row['car_brand'],
        'car_year' => $row['car_year'],
        'car_plate_id' => $row['car_plate_id'],
        'car_status' => $row['car_status'],
        'car_price_per_day' => $row['car_price_per_day'],
        'car_body_shape' => $row['car_body_shape'],
        'car_color' => $row['car_color'],
        // Assuming car_image is binary
        'customer_id' => $row['customer_id'],
        'customer_name' => $row['customer_name'],
        'customer_email' => $row['customer_email'],
        'customer_birth_date' => $row['customer_birth_date'],
        'customer_gender' => $row['customer_gender'],
        'customer_phone' => $row['customer_phone'],
        'customer_address' => $row['customer_address'],
        'reservation_id' => $row['reservation_id'],
        'reservation_date' => $row['reservation_date'],
        'pickup_date' => $row['pickup_date'],
        'return_date' => $row['return_date'],
        'reservation_status' => $row['reservation_status'],
        'reservation_pickup_location' => $row['reservation_pickup_location']
    );

    array_push($filteredData, $carData);
}

// Close the connection
$conn->close();

// Return JSON response
echo json_encode($filteredData);
?>
