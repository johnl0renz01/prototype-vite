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
        $sql = "SELECT * FROM user_request WHERE Email = '$email' ORDER BY Time DESC";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($requests);
        break;
    case "POST":
        $search = json_decode( file_get_contents('php://input') );
        $inputSearch = $search->searchQuery;
        $inputSearch = trim($inputSearch);

        if (!empty($inputSearch)) {
            $sql = "SELECT * FROM user_request WHERE Subject LIKE '$inputSearch' AND Email = '$email'
                                        OR Subject LIKE '%$inputSearch%' AND Email = '$email'
                                        OR Subject LIKE '%$inputSearch' AND Email = '$email'
                                        OR Subject LIKE '$inputSearch%' AND Email = '$email'
                  

                                        OR Status LIKE '$inputSearch' AND Email = '$email'
                                        OR Status LIKE '$inputSearch%' AND Email = '$email'

                                        OR Timestamp LIKE '$inputSearch' AND Email = '$email'
                                        OR Timestamp LIKE '%$inputSearch%' AND Email = '$email'
                                        OR Timestamp LIKE '%$inputSearch' AND Email = '$email'
                                        OR Timestamp LIKE '$inputSearch%' AND Email = '$email'
                                        
                                        ORDER BY Time DESC";

        } else {
            $sql = "SELECT * FROM user_request WHERE Email = '$email' ORDER BY Time DESC";
        }
        
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($requests);
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>