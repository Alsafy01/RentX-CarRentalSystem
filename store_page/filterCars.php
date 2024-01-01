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

$sql = "SELECT * FROM Cars";

// Check if there are any filters provided
if (!empty($data)) {
    $whereConditions = array();

    if (!empty($data['carIdFilter'])) {
        $whereConditions[] = "plate_id = '" . $data['carIdFilter'] . "'";
    }

    if (!empty($data['selectedBrands'])) {
        $whereConditions[] = "brand IN ('" . implode("','", $data['selectedBrands']) . "')";
    }

    if (!empty($data['selectedYear'])) {
        $whereConditions[] = "year = " . $data['selectedYear'];
    }

    if (!is_null($data['selectedStatus'])) {
        $whereConditions[] = "status = '" . $data['selectedStatus'] . "'";
    }

    if (!empty($data['pricePerDayFilter'])) {
        $whereConditions[] = "price_per_day <= " . $data['pricePerDayFilter'];
    }

    if (!empty($data['selectedBodyShapes'])) {
        $whereConditions[] = "body_shape IN ('" . implode("','", $data['selectedBodyShapes']) . "')";
    }

    if (!empty($data['selectedColors'])) {
        $whereConditions[] = "color IN ('" . implode("','", $data['selectedColors']) . "')";
    }

    // Construct the WHERE clause
    if (!empty($whereConditions)) {
        $sql .= " WHERE " . implode(" AND ", $whereConditions);
    }
}

$result = $conn->query($sql);

$filteredCarsData = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $carData = array(
            'brand' => $row['brand'],
            'model' => $row['model'],
            'plate_id' => $row['plate_id'],
            'year' => intval($row['year']),
            'price_per_day' => intval($row['price_per_day']), // Convert price to integer
            'body_shape' => $row['body_shape'],
            'status' => $row['status'],
            'color' => $row['color'],
            'car_image' => 'data:image/jpeg;base64,' . base64_encode($row['car_image'])
        );

        array_push($filteredCarsData, $carData);
    }
}

$conn->close();

echo json_encode($filteredCarsData);
?>
