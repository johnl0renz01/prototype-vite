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
$difficulty = "";


for ($i = strlen($account) - 1; $i > 0; $i--) {
    if ($account[$i] == "@") {
        $difficulty = substr($account, ($i + 1));
        $account = substr($account, 0, $i);
        break;
    }
}

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

        $validate = "SELECT * FROM ".$session_database." WHERE Question = '$question'";
        $stmtValidate = $conn->prepare($validate);
        $stmtValidate->execute();
        $unique = $stmtValidate->fetchAll(PDO::FETCH_ASSOC);
        

        if (count($unique) >= 2) {
            $sqlRemove = "DELETE FROM ".$session_database." WHERE Question = '$question' ORDER BY QuestionID ASC LIMIT 1";
            //$path = explode('/', $_SERVER['REQUEST_URI']);
            
            $stmtRemove = $conn->prepare($sqlRemove);
            $stmtRemove->execute();
        }
        
        if (count($unique) == 0) {
            date_default_timezone_set('Asia/Singapore');
            $sql = "INSERT INTO ".$session_database."(QuestionID, Question, Expressions, Status, TimeSpent, TimeStart, Difficulty) 
            VALUES(null, '$question', '$expression_sequence', '$question_status', '0', :start_time, '$difficulty')";

            $stmt = $conn->prepare($sql);

            
            $start_time = date('Y-m-d H:i:s');
            $stmt->bindParam(':start_time', $start_time);

            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }
        } else {
            date_default_timezone_set('Asia/Singapore');
            $sql1 = "SELECT TimeStart FROM ".$session_database." WHERE Question = '$question'";
            $stmt1 = $conn->prepare($sql1);
            $stmt1->execute();
            $time_start = $stmt1->fetchColumn();

            $time_start = strtotime($time_start);

            //GET CURRENT TIME
            $current_time = date('Y-m-d H:i:s');
            $current_time = strtotime($current_time);

            //DEDUCT TIME
            $time_spent = $current_time - $time_start;
            $time_spent = gmdate("H:i:s", $time_spent);

            $sql = "UPDATE ".$session_database." SET Expressions = '$expression_sequence', Status = '$question_status', TimeSpent = '$time_spent' WHERE Question = '$question'";
            $stmt = $conn->prepare($sql);

            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }
        }

        if ($expression_sequence == "EMPTY") {
            $sqlRemove = "DELETE FROM ".$session_database." WHERE Question = '$question' ORDER BY QuestionID ASC LIMIT 1";
            //$path = explode('/', $_SERVER['REQUEST_URI']);
            
            $stmtRemove = $conn->prepare($sqlRemove);
            $stmtRemove->execute();
        }
        
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>