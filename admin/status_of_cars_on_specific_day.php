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

// Check if variable is set and not empty
if (isset($_POST['variable']) && !empty($_POST['variable'])) {
    $reportPeriod = $_POST['variable'];

    // Assuming 'reservation_date' in Reservations table is used to determine the status on a specific day
    
    // Assuming 'reservation_date' in Reservations table is used to determine the status on a specific day
    $query = "SELECT
        c.car_id,
        c.model,
        c.brand,
        IF(r.car_id IS NOT NULL AND '$reportPeriod' BETWEEN r.reservation_date AND r.return_date, 'rented', 'active') AS car_status
        FROM
        Cars c
        LEFT JOIN
        Reservations r ON c.car_id = r.car_id";
    

    $result = $conn->query($query);

    $data = array(); // Array to store the results

    if ($result->num_rows > 0) {
        // Output data of each row
        while ($row = $result->fetch_assoc()) {
            // Store results in the array
            $data[] = array(
                'car_id' => $row["car_id"],
                'model' => $row["model"],
                'brand' => $row["brand"],
                'status' => $row["car_status"] // Fix the alias here
            );
        }
    }

    // Return the JSON-encoded array
    echo json_encode($data);
} else {
    // Variable not set or empty
    echo "Invalid request.";
}

// Close the connection
$conn->close();
?>
