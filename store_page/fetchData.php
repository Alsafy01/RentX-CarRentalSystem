<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rentx";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM Cars";
$result = $conn->query($sql);

$cardsData = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $carData = array(
			'car_id' => $row['car_id'],
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

        array_push($cardsData, $carData);
    }
}

$conn->close();

echo json_encode($cardsData);
?>

