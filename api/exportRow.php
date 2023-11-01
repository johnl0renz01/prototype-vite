<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$session_database = $_SERVER['REQUEST_URI'];
for ($i = strlen($session_database) - 1; $i > 0; $i--) {
    if ($session_database[$i] == "/") {
        $session_database = substr($session_database, ($i + 1));
        break;
    }
}


$database = preg_replace('/[0-9]+/', '', $session_database);
$sessionid = preg_replace('/[a-z\_]+/', '', $session_database);

switch($_SESSION['method']) {
    case "GET":
        break;
    case "POST":
        $tables = array();
        
        $sql = "SELECT * FROM ".$session_database." ORDER BY QuestionID ASC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $output = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $tables = array_merge($tables, $output);


        $sql5 = "SELECT CONCAT('') AS QuestionID, CONCAT('') AS Question, CONCAT('') AS Expressions, CONCAT('') AS Status,
        CONCAT('') AS TimeSpent,  CONCAT('') AS TimeStart, CONCAT('TOTAL HINTS: ', COUNT(*)) AS Difficulty FROM user_logs WHERE input = 'Hint Button Clicked' AND user_email = '$database' AND session_id = '$sessionid'";
        $stmt5 = $conn->prepare($sql5);
        $stmt5->execute();
        $output = $stmt5->fetchAll(PDO::FETCH_ASSOC);
        $tables = array_merge($tables, $output);

        $result = $tables;

        echo json_encode($result);

        /*
        $connect = mysqli_connect("localhost", "root", "", "prototype_sfe");  
        header('Content-Type: text/csv; charset=utf-8');  
        header('Content-Disposition: attachment; filename=data.csv');  
        $output = fopen("php://output", "w");  
        fputcsv($output, array('QuestionID', 'Question', 'Expressions', 'Status', 'TimeSpent', 'TimeStart'));  
        $query = "SELECT * FROM ".$session_database." ORDER BY QuestionID ASC";  
        $result = mysqli_query($connect, $query);  
        while($row = mysqli_fetch_assoc($result))  
        {  
             fputcsv($output, $row);  
        }  
        fpassthru($output);  
     
        echo json_encode($output);
        */
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>