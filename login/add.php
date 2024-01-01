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
$email = $_POST['email'];
$username = $_POST["username"];
$password = $_POST["password"];
$phone = $_POST["phone"];
$birthDate = $_POST["birthDate"];
$gender = $_POST["gender"];
$address = $_POST["address"];

// Check if the email already exists in the database
$sqlCheckEmail = "SELECT * FROM customers WHERE email=?";
$stmtCheckEmail = $conn->prepare($sqlCheckEmail);
$stmtCheckEmail->bind_param("s", $email);
$stmtCheckEmail->execute();
$resultCheckEmail = $stmtCheckEmail->get_result();

if ($resultCheckEmail->num_rows > 0) {
    // Email already exists
    $conn->close();
    header("Location: signup.html?error=Email Already Exists");
    exit();
} else {
    // Insert data into the database
    $sqlInsert = "INSERT INTO customers (email, name, password, phone, birth_date, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmtInsert = $conn->prepare($sqlInsert);
    $stmtInsert->bind_param("sssssss", $email, $username, $password, $phone, $birthDate, $gender, $address);
    
    if ($stmtInsert->execute()) {
        // Data successfully inserted
        $conn->close();
        header("Location: Login.html");
        exit();
    } else {
        // Error inserting data
        echo "Error: " . $sqlInsert . "<br>" . mysqli_error($conn);
    }
}

$conn->close();
?>
