<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$adviser = $_SERVER['REQUEST_URI'];

for ($i = strlen($adviser) - 1; $i > 0; $i--) {
    if ($adviser[$i] == "/") {
        $adviser = substr($adviser, ($i + 1));
        $adviser = str_replace("_"," ", $adviser);
        break;
    }
}


switch($_SESSION['method']) {
    case "GET":
        $sql = "SELECT * FROM section_list WHERE AdviserName = '$adviser' ORDER BY ABS(GradeLevel) ASC, SectionName ASC";

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result);
        break;
    case "POST":
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>