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
$user_email = $_SERVER['REQUEST_URI'];
for ($i = strlen($user_email) - 1; $i > 0; $i--) {
    if ($user_email[$i] == "/") {
        $user_email = substr($user_email, ($i + 1));
        break;
    }
}
/////////

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
        $subject = "#Forgot Password: Request";
        $role = "";
        $status = "UNSOLVED";
        $id = $c;


        $name = "";

        //CHECK IF ACCOUNT IS REGISTERED
        $validate = "SELECT * FROM accounts WHERE Email = :email";
        $stmt = $conn->prepare($validate);
        $stmt->bindParam(':email', $user->emailReset);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $valid = false;
        if (count($result) > 0) {
            $valid = true;        
        } else {
            $valid = false;
        }

        if ($valid) {
        //CHECK DUPLICATE REQUESTS
            $validate2 = "SELECT * FROM user_request WHERE Subject = '#Forgot Password: Request' AND Email = :email AND Status = 'UNSOLVED'";
            $stmt1 = $conn->prepare($validate2);
            $stmt1->bindParam(':email', $user->emailReset);
            $stmt1->execute();

            $result2 = $stmt1->fetchAll(PDO::FETCH_ASSOC);
            
            $valid2 = false;
            if (count($result2) > 0) {
                $valid2 = false;
            } else {
                $valid2 = true;

                //GET ACCOUNT ROLE
                $accountRole = "SELECT Role FROM accounts WHERE Email = :email";
                $req = $conn->prepare($accountRole);
                $req->bindParam(':email', $user->emailReset);
                $req->execute();
                $role = $req->fetchColumn();

                //GET FULL NAME

                $midname = "SELECT MiddleName FROM accounts WHERE Email = :email";
                $mn = $conn->prepare($midname);
                $mn->bindParam(':email', $user->emailReset);
                $mn->execute();
        
                $output = $mn->fetchColumn();
                
        
                if ($output != "") {
                    $fullname = "SELECT concat(GivenName, ' ', MiddleName, ' ', LastName) AS FullName FROM accounts WHERE Email = :email";
                    $fn = $conn->prepare($fullname);
                    $fn->bindParam(':email', $user->emailReset);
                    $fn->execute();
                    $name = $fn->fetchColumn();
                } else {
                    $fullname = "SELECT concat(GivenName, ' ', LastName) AS FullName FROM accounts WHERE Email = :email";
                    $fn = $conn->prepare($fullname);
                    $fn->bindParam(':email', $user->emailReset);
                    $fn->execute();
                    $name = $fn->fetchColumn();
                }
            }

            $read_admin = "FALSE";
            $read_user = "FALSE";
            if ($role == "Admin") {
                $read_admin = "TRUE";
            } else if ($role == "Teacher") {
                $read_user = "TRUE";
            } else {
                $read_user = "TRUE";
            }

            $new_state = "TRUE";

            if ($valid2) {
                $message = "The reset password request for ".$name." has been sent to the administrator.";

                //INSERT TO USER REQUEST
                $sql = "INSERT INTO user_request(UserID, Subject, Message, Email, Role, Status, RequestID, Timestamp, Time, ReadAdmin, ReadUser, Name, New) 
                                        VALUES(null, '$subject', '$message', :email, '$role', '$status', '$id', :timestamp, :timestamp2, '$read_admin', '$read_user', '$name', '$new_state')";
                $stmt2 = $conn->prepare($sql);
                $stmt2->bindParam(':email', $user->emailReset);
                date_default_timezone_set('Asia/Singapore');
                $timestamp = date('M d, Y - h:i A');
                $stmt2->bindParam(':timestamp', $timestamp);
                $timestamp2 = date('d-m-Y H:i:s');
                $stmt2->bindParam(':timestamp2', $timestamp2);
                $stmt2->execute();


                //INSERT TO PASSWORD REQUEST
                $sql2 = "INSERT INTO reset_request(ResetID, Name, Email) 
                                            VALUES(null, '$name', :email)";

                $stmt3 = $conn->prepare($sql2);
                $stmt3->bindParam(':email', $user->emailReset);

                if($stmt3->execute()) {
                    $response = ['status' => 1, 'message' => 'Record created successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to create record.'];
                }


                echo json_encode($response);
            }
        } 
        break;
    case "PUT":
        break;
        
    case "DELETE":
        break;
}



?>