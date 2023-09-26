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
$question = "";
$expression_sequence = "";
$question_status = "";

for ($i = strlen($account) - 1; $i > 0; $i--) {
    if ($account[$i] == "@") {
        $question_status = substr($account, ($i + 1));
        $account = substr($account, 0, $i);
        break;
    }
}

for ($i = strlen($account) - 1; $i > 0; $i--) {
    if ($account[$i] == "@") {
        $expression_sequence = substr($account, ($i + 1));
        $account = substr($account, 0, $i);
        break;
    }
}

for ($i = strlen($account) - 1; $i > 0; $i--) {
    if ($account[$i] == "@") {
        $question = substr($account, ($i + 1));
        $question = str_replace("_"," ", $question);
        $account = substr($account, 0, $i);
        break;
    }
}

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
        $session_database = $account.$session_id;


        $sql = "INSERT INTO ".$session_database."(QuestionID, Question, Expressions, Status) 
        VALUES(null, '$question', '$expression_sequence', '$question_status')";

        $stmt = $conn->prepare($sql);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }

        

        

        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>