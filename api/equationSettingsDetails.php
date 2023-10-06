<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$table_name = $_SERVER['REQUEST_URI'];

for ($i = strlen($table_name) - 1; $i > 0; $i--) {
    if ($table_name[$i] == "/") {
        $table_name = substr($table_name, ($i + 1));
        break;
    }
}

switch($_SESSION['method']) {
    case "GET":
        $sql = "SELECT * FROM ".$table_name."";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result);
        break;
    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $occurrence = $user->occurrenceValue;
        $prioritize = $user->prioritize;
        $fraction = $user->fraction;
        $minimum = $user->minimumValue;
        $maximum = $user->maximumValue;
        $different = $user->different;
        
        $sql = "UPDATE ".$table_name." SET OccurrenceValue = '$occurrence', PrioritizeEquation = '$prioritize', 
                                            FractionEquation = '$fraction', MinimumValue = '$minimum', 
                                            MaximumValue = '$maximum', DifferentVariables = '$different'";

        $stmt = $conn->prepare($sql);
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>