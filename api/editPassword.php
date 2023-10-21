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
        break;
    }
}

switch($_SESSION['method']) {
    case "GET":
        break;
    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $oldpassword = $user->oldPassword;
        $newpassword = $user->newPassword;
        $hashedPassword = password_hash($newpassword, PASSWORD_DEFAULT);

        //VERFIFY OLD PASSWORD
        $sql = "SELECT Password FROM accounts WHERE Email = '$email'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $account = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (count($account) > 0) {
            $password = implode(",", $account[0]);
            $password = explode(",", $password);
            if(password_verify($oldpassword, $password[0]) || $oldpassword == $password[0]) { //Hashed Password and Not hashed

                //SET NEW PASSWORD
                $sql2 = "UPDATE accounts SET Password = '$hashedPassword' WHERE Email = '$email'";
                $stmt2 = $conn->prepare($sql2);
                if($stmt2->execute()) {
                    $response2 = ['status' => 1, 'message' => 'Record created successfully.'];
                } else {
                    echo json_encode("Invalid");
                }
                
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