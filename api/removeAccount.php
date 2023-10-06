<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$email = $_SERVER['REQUEST_URI'];

for ($i = strlen($email) - 1; $i > 0; $i--) {
    if ($email[$i] == "/") {
        $email = substr($email, ($i + 1));
        $email = str_replace("_"," ", $email);
        break;
    }
}

switch($_SESSION['method']) {
    case "GET":
        break;
    case "POST":

        $rl = "SELECT Role FROM accounts WHERE Email = '$email'";
        $rl = $conn->prepare($rl);
        $rl->execute();
        $role = $rl->fetchColumn();

        if ($role == "Student") {
            $dbname = "SELECT REPLACE(CONCAT(LastName, '_', GivenName), ' ', '') AS DatabaseName FROM accounts WHERE Email = '$email'";
            $db = $conn->prepare($dbname);
            $db->execute();
            $database = $db->fetchColumn();
            $database = strtolower($database);


            $drop = "DROP TABLE $database";
            $stmtdrop = $conn->prepare($drop);
            $stmtdrop->execute();
        }
   
        $midname = "SELECT MiddleName FROM accounts WHERE Email = '$email'";
        $mn = $conn->prepare($midname);
        $mn->execute();

        $output = $mn->fetchColumn();
        $name = "";

        if ($output != "") {
            $fullname = "SELECT concat(GivenName, ' ', MiddleName, ' ', LastName) AS FullName FROM accounts WHERE Email = '$email'";
            $fn = $conn->prepare($fullname);
            $fn->execute();
            $name = $fn->fetchColumn();
        } else {
            $fullname = "SELECT concat(GivenName, ' ', LastName) AS FullName FROM accounts WHERE Email = '$email'";
            $fn = $conn->prepare($fullname);
            $fn->execute();
            $name = $fn->fetchColumn();
        }

      
        $sql = "DELETE FROM accounts WHERE Email = '$email'";

        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $sql2 = "UPDATE section_list SET AdviserName = '' WHERE AdviserName = '$name'";

        $stmt2 = $conn->prepare($sql2);
        $stmt2->execute();


        $logged = "FALSE";
        $sql0 = "UPDATE sessions SET Logged = '$logged'
                WHERE UserEmail = '$email'";
        $stmt0 = $conn->prepare($sql0);
        $stmt0->execute();
        

        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>