<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();


$grade_level = $_SERVER['REQUEST_URI'];

for ($i = strlen($grade_level) - 1; $i > 0; $i--) {
    if ($grade_level[$i] == "/") {
        $grade_level = substr($grade_level, ($i + 1));
        break;
    }
}

switch($_SESSION['method']) {
    case "GET":
        $sql = "SELECT * FROM section_list WHERE GradeLevel = '$grade_level' ORDER BY SectionName";
        //$path = explode('/', $_SERVER['REQUEST_URI']);
        
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result);
        break;
    case "POST":
        $search = json_decode( file_get_contents('php://input') );
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>