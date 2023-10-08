<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$account = $_SERVER['REQUEST_URI'];

for ($i = strlen($account) - 1; $i > 0; $i--) {
    if ($account[$i] == "/") {
        $account = substr($account, ($i + 1));
        break;
    }
}

$session_id = "";

for ($i = strlen($account) - 1; $i > 0; $i--) {
    if ($account[$i] == "@") {
        $session_id = substr($account, ($i + 1));
        $account = substr($account, 0, $i);
        break;
    }
}

switch($_SESSION['method']) {
    case "GET":
        break;
    case "POST":
        $connect = new mysqli('localhost','root','','prototype_sfe');
        
        $session_database = $account.$session_id;

        $create = "CREATE TABLE ".$session_database." (
            QuestionID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY   , 
            Question VARCHAR(255) NOT NULL , 
            Expressions TEXT NOT NULL , 
            Status VARCHAR(255) NOT NULL , 
            TimeSpent VARCHAR(255) NOT NULL , 
            TimeStart VARCHAR(255) NOT NULL 
            )";

        $conn->exec($create);
        echo "\nTable created successfully";

        /*
        $sql2 = "INSERT INTO ".$id."(MessageID, Name, Date, Timestamp, Message) 
                VALUES(null, '$name', :date, :time, :message)";
                */
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>