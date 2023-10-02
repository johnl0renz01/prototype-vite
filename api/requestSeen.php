<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$requestID = $_SERVER['REQUEST_URI'];

for ($i = strlen($requestID) - 1; $i > 0; $i--) {
    if ($requestID[$i] == "/") {
        $requestID = substr($requestID, ($i + 1));
        break;
    }
}

$role = "";

for ($i = strlen($requestID) - 1; $i > 0; $i--) {
    if ($requestID[$i] == "@") {
        $role = substr($requestID, ($i + 1));
        $requestID = substr($requestID, 0, $i);
        break;
    }
}

switch($_SESSION['method']) {
    case "GET":
        break;
    case "POST":

        $read_admin = "TRUE";
        $read_user = "TRUE";
        $new_state = "FALSE";

        if ($role == "Admin") {
            $sql = "UPDATE user_request SET ReadAdmin = '$read_admin', New = '$new_state' 
                    WHERE RequestID = '$requestID'";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
        } else if ($role == "Teacher") {
            $sql = "UPDATE user_request SET ReadUser = '$read_user' 
                WHERE RequestID = '$requestID'";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
        }
    
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>