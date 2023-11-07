<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$email = $_SERVER['REQUEST_URI'];

for ($i = strlen($email) - 1; $i > 0; $i--) {
    if ($email[$i] == "/") {
        $email = substr($email, ($i + 1));
        break;
    }
}

switch($_SESSION['method']) {
    case "GET":
        break;
    case "POST":
        $sql = "DELETE FROM reset_request WHERE Email = '$email'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $solved = "SOLVED";
        $subject = "#Forgot Password: Request";

        $sql2 = "UPDATE user_request SET Status = '$solved' WHERE Email = '$email' AND Subject = '$subject'";
        $stmt2 = $conn->prepare($sql2);
        $stmt2->execute();
    
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}


?>