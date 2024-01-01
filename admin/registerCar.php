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

// Gather data from the AJAX request
$model = $_POST['model'];
$brand = $_POST['brand'];
$year = $_POST['year'];
$plateId = $_POST['plateId'];
$status = $_POST['status'];
$pricePerDay = $_POST['pricePerDay'];
$bodyShape = $_POST['bodyShape'];
$color = $_POST['color'];

// Handle image upload
$carImage = $_FILES['carImage'];
$carImageTmpName = $carImage['tmp_name'];

// Read the image data into a variable
$carImageData = addslashes(file_get_contents($carImageTmpName));

// Insert data into the Cars table with the image data
$sql = "INSERT INTO Cars (model, brand, year, plate_id, status, price_per_day, body_shape, color, car_image) VALUES ('$model', '$brand', $year, '$plateId', '$status', $pricePerDay, '$bodyShape', '$color', '$carImageData')";

if ($conn->query($sql) === TRUE) {
    echo "Car registered successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close connection
$conn->close();
?>
