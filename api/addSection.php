<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

function random_str(
    int $length = 64,
    string $keyspace = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
): string {
    if ($length < 1) {
        throw new \RangeException("Length must be a positive integer");
    }
    $pieces = [];
    $max = mb_strlen($keyspace, '8bit') - 1;
    for ($i = 0; $i < $length; ++$i) {
        $pieces []= $keyspace[random_int(0, $max)];
    }
    return implode('', $pieces);
}

$code = random_str(8);
$false = "FALSE";

switch($_SESSION['method']) {
    case "GET":
        break;
    case "POST":
        $user = json_decode( file_get_contents('php://input') );
    
        
        $sql = "INSERT INTO section_list(SectionID, GradeLevel, SectionName, AdviserName, Code, Seen) 
        VALUES(null, :gradeLevel, :sectionName, :adviserName, '$code', '$false')";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':gradeLevel', $user->gradeLevel);
        $stmt->bindParam(':sectionName', $user->sectionName);
        $stmt->bindParam(':adviserName', $user->adviserName);
        
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }

        echo "\n".json_encode($response);
        break;
    case "PUT":
        break;
        
    case "DELETE":
        break;
}



?>