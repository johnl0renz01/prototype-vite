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

$role = "";
$name = "";

for ($i = strlen($email) - 1; $i > 0; $i--) {
    if ($email[$i] == "~") {
        $name = substr($email, ($i + 1));
        $name = str_replace("_"," ", $name);
        $email = substr($email, 0, $i);
        break;
    }
}

for ($i = strlen($email) - 1; $i > 0; $i--) {
    if ($email[$i] == "~") {
        $role = substr($email, ($i + 1));
        $email = substr($email, 0, $i);
        break;
    }
}



function random_str(
    int $length = 64,
    string $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
): string {
    if ($length < 1) {
        throw new \RangeException("Length must be a positive integer");
    }
    $pieces = [];
    $max = mb_strlen($keyspace, '8bit') - 1;
    for ($i = 0; $i < $length; ++$i) {
        $pieces []= $keyspace[random_int(0, $max)];
    }
    return implode('', $pieces);
}

$a = random_str(32);
$b = random_str(8, 'abcdefghijklmnopqrstuvwxyz');
$c = random_str();


switch($_SESSION['method']) {
    case "GET":
        break;
    case "POST":
        $user = json_decode( file_get_contents('php://input') );

        //GET FULLNAME
        /*
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
        */
        //END OF CODE^

        $status = "UNSOLVED";
        $id = $c;
        $id[0] = "z";
        $id[1] = "z";
        $id[2] = "z";

        $read_admin = "FALSE";
        $read_user = "FALSE";
        if ($role == "Admin") {
            $read_admin = "TRUE";
        } else if ($role == "Teacher") {
            $read_user = "TRUE";
        }

        $new_state = "TRUE";

        $sql = "INSERT INTO user_request(UserID, Subject, Message, Email, Role, Status, RequestID, Timestamp, Time, ReadAdmin, ReadUser, Name, New) 
                VALUES(null, :subject, :message, '$email', '$role', '$status', '$id', :timestamp, :timestamp2, '$read_admin', '$read_user', '$name', '$new_state')";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':subject', $user->subject);
        $stmt->bindParam(':message', $user->message);

        date_default_timezone_set('Asia/Singapore');
        $timestamp = date('M d, Y - h:i A');
        $stmt->bindParam(':timestamp', $timestamp);
        $timestamp2 = date('Y-m-d H:i:s');
        $stmt->bindParam(':timestamp2', $timestamp2);
        
        if($stmt->execute()) {
            $connect = new mysqli('localhost','root','','prototype_sfe');
            
            $create = "CREATE TABLE ".$id." (
                MessageID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY   , 
                Name VARCHAR(255) NOT NULL , 
                Date VARCHAR(255) NOT NULL , 
                Timestamp VARCHAR(255) NOT NULL ,
                Message TEXT NOT NULL
                )";
    
            $conn->exec($create);
            echo "\nTable created successfully";
    
            $sql2 = "INSERT INTO ".$id."(MessageID, Name, Date, Timestamp, Message) 
                    VALUES(null, '$name', :date, :time, :message)";
    
            $stmt2 = $conn->prepare($sql2);
    
            date_default_timezone_set('Asia/Singapore');
            $date = date('M d, Y - h:i A');
            $stmt2->bindParam(':date', $date);
            $time = date('Y-m-d H:i:s');
            $stmt2->bindParam(':time', $time);
    
            $stmt2->bindParam(':message', $user->message);
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