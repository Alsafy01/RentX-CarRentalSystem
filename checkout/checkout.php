<?php
// Replace these variables with your actual database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rentx";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from the POST request
$price = $_POST['price'];
$customerID = $_POST['customer_id'];
$carID = $_POST['car_id'];
$pickupDate = $_POST['pickupDate'];
$returnDate = $_POST['returnDate'];
$paymentType = $_POST['payment_method'];
$paypal = $_POST['paypalnum'];
$credit4 = $_POST['creditnum'];
$creditExp = $_POST['creditExp'];
$location = $_POST['location'];

// Perform any additional processing or validation if needed

// Insert data into the 'Reservations' table
$sqlInsertReservation = "INSERT INTO Reservations (car_id, customer_id, reservation_date, pickup_date, return_date, pickup_location,status) VALUES (?, ?, NOW(), ?, ?, ?, 'reserved')";
$stmtInsertReservation = $conn->prepare($sqlInsertReservation);
$stmtInsertReservation->bind_param("iisss", $carID, $customerID, $pickupDate, $returnDate, $location);

$stmtInsertReservation->execute();


$reservationID = $stmtInsertReservation->insert_id;
$stmtInsertReservation->close();
// Insert data into the 'Payments' table
$sqlInsertPayment = "INSERT INTO Payments (reservation_id, amount, payment_date, payment_type) VALUES (?, ?, NOW(), ?)";
$stmtInsertPayment = $conn->prepare($sqlInsertPayment);

// Set the payment amount based on your business logic
$paymentAmount = $price;

$stmtInsertPayment->bind_param("ids", $reservationID, $paymentAmount, $paymentType);

$stmtInsertPayment->execute();


$stmtInsertPayment->close();



// Update the status of the car to 'rented'
$sqlUpdateCarStatus = "UPDATE Cars SET status = 'rented' WHERE car_id = ?";
$stmtUpdateCarStatus = $conn->prepare($sqlUpdateCarStatus);
$stmtUpdateCarStatus->bind_param("i", $carID);

$stmtUpdateCarStatus->execute();

$stmtUpdateCarStatus->close();


if ($paymentType === "credit_card"){
    
    $sqlFetchCardHolderName = "SELECT `name` FROM Customers WHERE customer_id = ?";
    $stmtFetchCardHolderName = $conn->prepare($sqlFetchCardHolderName);
    $stmtFetchCardHolderName->bind_param("i", $customerID);
    $stmtFetchCardHolderName->execute();
    $resultFetchCardHolderName = $stmtFetchCardHolderName->get_result();

    $row = $resultFetchCardHolderName->fetch_assoc();
    $cardHolderName = $row['name'];
    $stmtFetchCardHolderName->close();

    // Check if the credit card already exists in the CreditCards table
    $sqlCheckCreditCard = "SELECT * FROM CreditCards WHERE customer_id = ? AND card_last_four = ? AND card_expiration = ? AND card_holder_name = ?";
    $stmtCheckCreditCard = $conn->prepare($sqlCheckCreditCard);
    $stmtCheckCreditCard->bind_param("isss", $customerID, $credit4, $creditExp,$cardHolderName);
    $stmtCheckCreditCard->execute();
    $resultCheckCreditCard = $stmtCheckCreditCard->get_result();
    $stmtCheckCreditCard->close();

    if ($resultCheckCreditCard->num_rows === 0) {
        // Credit card not found, insert it into the CreditCards table
        $sqlInsertCreditCard = "INSERT INTO CreditCards (customer_id, card_last_four, card_expiration, card_holder_name) VALUES (?, ?, ?, ?)";
        $stmtInsertCreditCard = $conn->prepare($sqlInsertCreditCard);
        $stmtInsertCreditCard->bind_param("isss", $customerID, $credit4, $creditExp, $cardHolderName); // Adjust $cardHolderName accordingly
        $stmtInsertCreditCard->execute();
        $stmtInsertCreditCard->close();
}


}




$conn->close();
?>

