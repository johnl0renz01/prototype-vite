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

        $totalquestions = $user->totalquestions;


        $equations = $user->equations;
        //$equations = implode(" ", $equations);
        $equations = str_replace("_"," ", $equations);
        $equations_array = explode(',', $equations);
        echo $equations_array[0];

        for ($i = 0; $i < $totalquestions; $i++) {
            $question = $equations_array[$i];
            $sql = "INSERT INTO ".$session_database."(QuestionID, Question, Expressions, Status) 
            VALUES(null, '$question', '', '')";

            $stmt = $conn->prepare($sql);
            $stmt->execute();
        }
       
        echo "\nData recorded successfully";
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>