<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$original_email = $_SERVER['REQUEST_URI'];

for ($i = strlen($original_email) - 1; $i > 0; $i--) {
    if ($original_email[$i] == "/") {
        $original_email = substr($original_email, ($i + 1));
        break;
    }
}

switch($_SESSION['method']) {
    case "GET":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "SELECT * FROM accounts WHERE Email = '$original_email'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $account = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($account);
        break;
    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $firstName = $user->firstName;
        $middleName = $user->middleName;
        $lastName = $user->lastName;
        $sex = $user->sex;

        $gradeLevel = $user->gradeLevel;
        $section = $user->section;
        $groupType = $user->groupType;

        $email = $user->email;

        
        $sql = "UPDATE accounts SET GivenName = '$firstName', MiddleName = '$middleName', LastName = '$lastName', 
                Gender = '$sex', GradeLevel = '$gradeLevel', Section = '$section', GroupType = '$groupType', 
                Email = '$email' 
                WHERE Email = '$original_email'";

        $stmt = $conn->prepare($sql);
        //WITHOUT HASH SECURITY
        //$stmt->bindParam(':password', $user->password);
        
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
            if ($gradeLevel != '') {
                $userTable = $original_email;
                echo "\n".$userTable;
                $atSign = strpos($userTable, "@");
                echo "\n".$atSign;
                $userTable = substr($userTable, 0, $atSign);
                echo "\n".$userTable;
                $userTable = str_replace(".", "_", $userTable);
                echo "\n".$userTable;
    
                $newTable = $user->email;
                echo "\n".$newTable;
                $atSign2 = strpos($newTable, "@");
                echo "\n".$atSign2;
                $newTable = substr($newTable, 0, $atSign2);
                echo "\n".$newTable;
                $newTable = str_replace(".", "_", $newTable);
                echo "\n".$newTable;
    
                $sql2 = "ALTER TABLE ".$userTable." RENAME TO ".$newTable."";
                $stmt2 = $conn->prepare($sql2);
                $stmt2->execute();
            }
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }

        

        echo "\n".json_encode($response);
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>