<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rentx";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get filter values from the AJAX request
$data = json_decode(file_get_contents("php://input"), true);

$sql = "
    SELECT Cars.*, Reservations.reservation_id, Reservations.reservation_date, Customers.name AS customer_name, Customers.email AS customer_email
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

    if (!empty($data['selectedBrands'])) {
        $brandConditions = implode("', '", $conn->real_escape_string($data['selectedBrands']));
        $whereConditions[] = "brand IN ('$brandConditions')";
    }

    if (!empty($data['selectedYear'])) {
        $whereConditions[] = "year = " . (int)$data['selectedYear'];
    }

    if (!is_null($data['selectedStatus'])) {
        $whereConditions[] = "status = '" . $conn->real_escape_string($data['selectedStatus']) . "'";
    }

    if (!empty($data['pricePerDayFilter'])) {
        $whereConditions[] = "price_per_day <= " . (float)$data['pricePerDayFilter'];
    }

    if (!empty($data['selectedBodyShapes'])) {
        $bodyShapeConditions = implode("', '", $conn->real_escape_string($data['selectedBodyShapes']));
        $whereConditions[] = "body_shape IN ('$bodyShapeConditions')";
    }

    if (!empty($data['selectedColors'])) {
        $colorConditions = implode("', '", $conn->real_escape_string($data['selectedColors']));
        $whereConditions[] = "color IN ('$colorConditions')";
    }

    // Construct the WHERE clause
    if (!empty($whereConditions)) {
        $sql .= " WHERE " . implode(" AND ", $whereConditions);
    }
}

$result = $conn->query($sql);

$filteredData = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $carData = array(
            'brand' => $row['brand'],
            'model' => $row['model'],
            'plate_id' => $row['plate_id'],
            'year' => intval($row['year']),
            'price_per_day' => floatval($row['price_per_day']), // Convert price to float
            'body_shape' => $row['body_shape'],
            'status' => $row['status'],
            'color' => $row['color'],
            'car_image' => 'data:image/jpeg;base64,' . base64_encode($row['car_image']),
            'reservation_id' => intval($row['reservation_id']),
            'reservation_date' => $row['reservation_date'],
            'customer_name' => $row['customer_name'],
            'customer_email' => $row['customer_email']
        );

        array_push($filteredData, $carData);
    }
}

$conn->close();

echo json_encode($filteredData);
?>
