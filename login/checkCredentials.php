<?php
// Start the session
session_start();


// Replace these variables with your actual database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rentx";

// Retrieve email and password from the POST request
$conn = new mysqli($servername, $username, $password, $dbname);

$email = $_POST['email'];
$password = $_POST['password'];
$admin = $_POST['admin'];


       
// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if ($admin === 'true'){
    // TODO: Use prepared statements to prevent SQL injection
    $sql = "SELECT * FROM admins WHERE email = '$email' AND password = '$password'";
    $result = $conn->query($sql);
    



    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        // Authentication successful
        $_SESSION['loggedin'] = true;  // Set a session variable to indicate user is logged in
        $_SESSION['admin'] = true;
        $_SESSION['ID'] = intval($row['admin_id']);

        $conn->close();
        header("Location: ../store_page/rent.html"); // Redirect to rent.html
        exit();
    } else {
        // Authentication failed
        echo '<script type="text/javascript">console.log("Authentication failed");</script>';
        header("Location: Login.html");
    }

    // Close the database connection
    $conn->close();
    }
    else{
    // TODO: Use prepared statements to prevent SQL injection
    $sql = "SELECT * FROM customers WHERE email = '$email' AND password = '$password'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        // Authentication successful
        $_SESSION['loggedin'] = true;  // Set a session variable to indicate user is logged in
        $_SESSION['ID'] = intval($row['customer_id']);

        $conn->close();
        header("Location: ../store_page/rent.html"); // Redirect to rent.html
        exit();
    } else {
        // Authentication failed
        echo '<script type="text/javascript">console.log("Authentication failed");</script>';
        header("Location: Login.html");
    }

    // Close the database connection
    $conn->close();
}

?>
