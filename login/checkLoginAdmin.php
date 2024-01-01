<?php
session_start();

if (isset($_SESSION['admin']) && $_SESSION['admin'] === true) {
    echo "true";
} else {
    echo "false";
}
?>
