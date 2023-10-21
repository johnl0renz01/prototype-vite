<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$unique = $_SERVER['REQUEST_URI'];

for ($i = strlen($unique) - 1; $i > 0; $i--) {
    if ($unique[$i] == "/") {
        $unique = substr($unique, ($i + 1));
        break;
    }
}


switch($_SESSION['method']) {
    case "GET":

        $sql0 = "SELECT * FROM sessions WHERE UniqueID = '$unique'";
        
        $stmt0 = $conn->prepare($sql0);
        $stmt0->execute();
        $resultCheck = $stmt0->fetchAll(PDO::FETCH_ASSOC);

        $sql = "SELECT Logged FROM sessions WHERE UniqueID = '$unique'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        
        $result = $stmt->fetchColumn();

        if (count($resultCheck) > 0) {
            echo json_encode($result);
        } else {
            echo json_encode("FALSE");
        }
        
        break;
    case "POST":
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>