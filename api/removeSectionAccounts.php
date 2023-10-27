<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$section = $_SERVER['REQUEST_URI'];

for ($i = strlen($section) - 1; $i > 0; $i--) {
    if ($section[$i] == "/") {
        $section = substr($section, ($i + 1));
        $section = str_replace("_"," ", $section);
        break;
    }
}

switch($_SESSION['method']) {
    case "GET":
        break;
    case "POST":
        // LOG OUT ALL ACTIVE SESSIONS OF STUDENTS' ACCOUNTS
        $sql3 = "SELECT Email FROM accounts WHERE Section = '$section'";
        $stmt3 = $conn->prepare($sql3);
        $stmt3->execute();
        $emailID = $stmt3->fetchAll(PDO::FETCH_ASSOC);

        // PUT EMAILS IN ARRAY 
        $emails = array();
        for ($i = 0; $i < count($emailID); $i++) {
            $emailNumber = strpos(implode($emailID[$i]), ":");
            $emailItem = substr(implode($emailID[$i]), $emailNumber);
            $emails[] = $emailItem; 
        }

        // LOG OUT 
        for ($i = 0; $i < count($emails); $i++) {
            $currentEmail = $emails[$i];

            //LOGOUT OTHER SESSIONS
            $logged = "FALSE";
            $sql0 = "UPDATE sessions SET Logged = '$logged'
            WHERE UserEmail = '$currentEmail'
            AND Logged = 'TRUE'";
            $stmt0 = $conn->prepare($sql0);
            $stmt0->execute();
        }


        $sql = "DELETE FROM section_list WHERE SectionName = '$section'";

        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $sql2 = "DELETE FROM accounts WHERE Section = '$section'";
        $stmt2 = $conn->prepare($sql2);

        if($stmt2->execute()) {
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