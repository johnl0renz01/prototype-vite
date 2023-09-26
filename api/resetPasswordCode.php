<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();


//UNUSED
$email= $_SERVER['REQUEST_URI'];

for ($i = strlen($email) - 1; $i > 0; $i--) {
    if ($email[$i] == "/") {
        $email = substr($email, ($i + 1));
        break;
    }
}

$default = "default";


switch($_SESSION['method']) {
    case "GET":
        break;
    case "POST":
        $user = json_decode( file_get_contents('php://input') );

        $email = $user->emailReset;
        $code = $user->code;

        $validate = "SELECT Role FROM accounts WHERE Email = '$email'";
        $stmtValidate = $conn->prepare($validate);
        $stmtValidate->execute();
        $res = $stmtValidate->fetchColumn();

        if ($res == "Teacher") {
            $name = "";
            $midname = "SELECT MiddleName FROM accounts WHERE Email = '$email'";
            $mn = $conn->prepare($midname);
            $mn->execute();

            $output = $mn->fetchColumn();
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

            $sql = "SELECT AdviserName FROM section_list WHERE Code = '$code'";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchColumn();

            if ($result == $name) {
                $sqlSuccess = "UPDATE accounts SET Password = '$default'
                        WHERE Email = '$email'";

                $stmtSuccess = $conn->prepare($sqlSuccess);
                $stmtSuccess->execute();
                echo json_encode("Valid");
            } else {
                echo json_encode("Invalid");
            }
        
        } else if ($res == "Student") {
            $sqlStudent = "SELECT Section FROM accounts WHERE Email = '$email'";
            $stmtStudent = $conn->prepare($sqlStudent);
            $stmtStudent->execute();
            $resultStudent = $stmtStudent->fetchColumn();

            $sqlStudent2 = "SELECT SectionName FROM section_list WHERE Code = '$code'";
            $stmtStudent2 = $conn->prepare($sqlStudent2);
            $stmtStudent2->execute();
            $resultStudent2 = $stmtStudent2->fetchColumn();

            if ($resultStudent == $resultStudent2) {
                
                $sqlSuccess = "UPDATE accounts SET Password = '$default'
                        WHERE Email = '$email'";

                $stmtSuccess = $conn->prepare($sqlSuccess);
                $stmtSuccess->execute();

                echo json_encode("Valid");        
            } else {
                echo json_encode("Invalid");
            }
        } else {
            echo json_encode("Invalid");
        }
        
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>