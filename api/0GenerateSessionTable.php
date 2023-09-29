<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

switch($_SESSION['method']) {
    case "GET":
        break;
    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $tablename = $user->tablename;
        $session_id = $user->sessionid;
        
        $session_database = $tablename.$session_id;

        $create = "CREATE TABLE ".$session_database." (
            QuestionID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY   , 
            Question VARCHAR(255) NOT NULL , 
            Expressions TEXT NOT NULL , 
            Status VARCHAR(255) NOT NULL
            )";

        $conn->exec($create);
        echo "\nTable created successfully";

        /*
        $sql2 = "INSERT INTO ".$id."(MessageID, Name, Date, Timestamp, Message) 
                VALUES(null, '$name', :date, :time, :message)";
                */
        break;
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>