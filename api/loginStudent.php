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
        $sql = "SELECT GivenName, Email FROM accounts WHERE Email = :email AND Password = :password";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':password', $user->password);

        $stmt->execute();
        $account = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (count($account) > 0) {
            echo json_encode($account);
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