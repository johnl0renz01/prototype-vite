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

switch($_SESSION['method']) {
    case "GET":
        break;
    case "POST":

        $tables = array();
        // RENAME ALL SESSION TABLES OF STUDENT

        $sql3 = "SELECT SessionID FROM ".$session_database."";
        $stmt3 = $conn->prepare($sql3);
        $stmt3->execute();
        $sessionID = $stmt3->fetchAll(PDO::FETCH_ASSOC);

        // PUT SESSIONS IN ARRAY 
        $sessions = array();
        for ($i = 0; $i < count($sessionID); $i++) {
            $sessionNumber = strpos(implode($sessionID[$i]), ":");
            $sessionItem = substr(implode($sessionID[$i]), $sessionNumber);
            $sessions[] = $sessionItem; 
        }

        // RENAME 
        for ($i = 0; $i < count($sessions); $i++) {
            $session_table = $session_database.$sessions[$i];

            $sql4 = "SELECT * FROM ".$session_table." ORDER BY QuestionID ASC";
            $stmt4 = $conn->prepare($sql4);
            $stmt4->execute();
            $output = $stmt4->fetchAll(PDO::FETCH_ASSOC);

            $tables = array_merge($tables, $output);
        }


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