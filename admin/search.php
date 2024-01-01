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

// Function to construct and execute the SQL query based on received parameters
function performSearch($conn, $searchParams) {
    // Initialize an array to store conditions for the WHERE clause
    $conditions = array();

    // Check each search parameter and add conditions accordingly
    $carFields = array('carModel', 'carPlateId', 'bodyShape', 'color');
    $customerFields = array('customerName', 'phone', 'customerEmail');
    $reservationFields = array('reservationDate');

    foreach ($carFields as $field) {
        if (!empty($searchParams[$field])) {
            $conditions[] = "c.$field = '" . $conn->real_escape_string($searchParams[$field]) . "'";
        }
    }

    foreach ($customerFields as $field) {
        if (!empty($searchParams[$field])) {
            $conditions[] = "cu.$field = '" . $conn->real_escape_string($searchParams[$field]) . "'";
        }
    }

    foreach ($reservationFields as $field) {
        if (!empty($searchParams[$field])) {
            $conditions[] = "r.$field = '" . $conn->real_escape_string($searchParams[$field]) . "'";
        }
    }

    // Construct the SQL query
    $sql = "SELECT c.*, cu.*, r.*
            FROM Cars c
            LEFT JOIN Reservations r ON c.car_id = r.car_id
            LEFT JOIN Customers cu ON r.customer_id = cu.customer_id";

    // Add WHERE clause if conditions are present
    if (!empty($conditions)) {
        $sql .= " WHERE " . implode(" AND ", $conditions);
    }

    // Execute the query
    $result = $conn->query($sql);

    // Check if the query was successful
    if ($result === FALSE) {
        die("Error executing the query: " . $conn->error);
    }

    // Initialize an array to store the retrieved data
    $responseData = array();

    // Process the query result and store in the array
    while ($row = $result->fetch_assoc()) {
        $responseData[] = $row;
    }

    // Close the database connection
    $conn->close();

    // Return the data as JSON response to JavaScript
    header('Content-Type: application/json');
    echo json_encode($responseData);
}

// Get the search parameters from the POST request
$searchParams = $_POST;

// Call the function to perform the search
performSearch($conn, $searchParams);
?>
