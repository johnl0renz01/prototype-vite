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
        
        $create = "CREATE TABLE ".$tablename." (
            SessionID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY   , 
                SessionType VARCHAR(255) NOT NULL , 
                Score INT NOT NULL , 
                TimeSpent VARCHAR(255) NOT NULL , 
                TimeStamp VARCHAR(255) NOT NULL ,
                TimeStart VARCHAR(255) NOT NULL ,
                ExpressionAngry VARCHAR(255) NOT NULL ,
                ExpressionHappy VARCHAR(255) NOT NULL ,
                ExpressionSad VARCHAR(255) NOT NULL ,
                ExpressionSurprised VARCHAR(255) NOT NULL ,
                ExpressionMotivation VARCHAR(255) NOT NULL ,
                Sequence TEXT NOT NULL ,
                Answered VARCHAR(255) NOT NULL ,
                Abandoned VARCHAR(255) NOT NULL ,
                LevelUp VARCHAR(255) NOT NULL
                )";

        $conn->exec($create);
        echo "\nTable created successfully";
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>