<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$requestID = $_SERVER['REQUEST_URI'];

for ($i = strlen($requestID) - 1; $i > 0; $i--) {
    if ($requestID[$i] == "/") {
        $requestID = substr($requestID, ($i + 1));
        break;
    }
}

$role = "";
$email = "";

//USE ~ IF EMAIL EXIST (Because of '@')

for ($i = strlen($requestID) - 1; $i > 0; $i--) {
    if ($requestID[$i] == "~") {
        $email = substr($requestID, ($i + 1));
        $requestID = substr($requestID, 0, $i);
        break;
    }
}


for ($i = strlen($requestID) - 1; $i > 0; $i--) {
    if ($requestID[$i] == "~") {
        $role = substr($requestID, ($i + 1));
        $requestID = substr($requestID, 0, $i);
        break;
    }
}


switch($_SESSION['method']) {
    case "GET":
        break;
    case "POST":
        $user = json_decode( file_get_contents('php://input') );

        //GET FULLNAME
        $name = "";
        if ($role != "Admin") {
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
        } else {
            $name = "Admin";
        }
        //END OF CODE^

        $sql = "INSERT INTO ".$requestID."(MessageID, Name, Date, Timestamp, Message) 
                    VALUES(null, '$name', :date, :time, :message)";
    
        $stmt = $conn->prepare($sql);

        date_default_timezone_set('Asia/Singapore');
        $date = date('M d, Y - h:i A');
        $stmt->bindParam(':date', $date);
        $time = date('d-m-Y H:i:s');
        $stmt->bindParam(':time', $time);

        $stmt->bindParam(':message', $user->message);
        if($stmt->execute()) {

            $sql2 = "UPDATE user_request SET Timestamp = :timestamp, Time = :time2
            WHERE RequestID = '$requestID'";
            $stmt2 = $conn->prepare($sql2);
            $timestamp = date('M d, Y - h:i A');
            $stmt2->bindParam(':timestamp', $timestamp);
            $stmt2->bindParam(':time2', $time);

            if($stmt2->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }

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