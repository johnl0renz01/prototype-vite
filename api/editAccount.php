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
        //LOGOUT OTHER SESSIONS
        $logged = "FALSE";
        $sql0 = "UPDATE sessions SET Logged = '$logged'
        WHERE UserEmail = '$original_email'
            AND Logged = 'TRUE'";
        $stmt0 = $conn->prepare($sql0);
        $stmt0->execute();


        $user = json_decode( file_get_contents('php://input') );
        $firstName = $user->firstName;
        $middleName = $user->middleName;
        $lastName = $user->lastName;
        $sex = $user->sex;

        $gradeLevel = $user->gradeLevel;
        $section = $user->section;
        $groupType = $user->groupType;

        $email = $user->email;

        //GET PREVIOUS FULL NAME OF TEACHER
        $name = "";
        if ($gradeLevel == '') {
            $midname = "SELECT MiddleName FROM accounts WHERE Email = '$original_email'";
            $mn = $conn->prepare($midname);
            $mn->execute();

            $output = $mn->fetchColumn();
            if ($output != "") {
                $fullname = "SELECT concat(GivenName, ' ', MiddleName, ' ', LastName) AS FullName FROM accounts WHERE Email = '$original_email'";
                $fn = $conn->prepare($fullname);
                $fn->execute();
                $name = $fn->fetchColumn();
            } else {
                $fullname = "SELECT concat(GivenName, ' ', LastName) AS FullName FROM accounts WHERE Email = '$original_email'";
                $fn = $conn->prepare($fullname);
                $fn->execute();
                $name = $fn->fetchColumn();
            }

            $fullname = "";
            if ($middleName != '') {
                $fullname = $firstName . " " . $middleName . " " . $lastName;
            } else {
                $fullname = $firstName . " " . $lastName;
            }

            $sqlSection = "UPDATE section_list SET AdviserName = '$fullname'
                    WHERE AdviserName = '$name'";
            $stmtSection = $conn->prepare($sqlSection);
            $stmtSection->execute();
        }


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
                $atSign = strpos($userTable, "@");
                $userTable = substr($userTable, 0, $atSign);
                $userTable = str_replace(".", "_", $userTable);
    
                $newTable = $user->email;
                $atSign2 = strpos($newTable, "@");
                $newTable = substr($newTable, 0, $atSign2);
                $newTable = str_replace(".", "_", $newTable);
    
                $sql2 = "ALTER TABLE ".$userTable." RENAME TO ".$newTable."";
                $stmt2 = $conn->prepare($sql2);
                $stmt2->execute();


                // RENAME ALL SESSION TABLES OF STUDENT

                $sql3 = "SELECT SessionID FROM ".$newTable."";
                $stmt3 = $conn->prepare($sql3);
                $stmt3->execute();
                $sessionID = $stmt3->fetchAll(PDO::FETCH_ASSOC);

                // PUT SESSIONS IN ARRAY 
                $sessions = array();
                for ($i = 0; $i < count($sessionID); $i++) {
                    $sessionNumber = strpos(implode($sessionID[$i]), ":");
                    $sessionItem = substr(implode($sessionID[$i]), $sessionNumber);
                    $sessions[] = $sessionItem; 
                }

                // RENAME 
                for ($i = 0; $i < count($sessions); $i++) {
                    $old_session_table = $userTable.$sessions[$i];
                    $new_session_table = $newTable.$sessions[$i];

                    $sql4 = "ALTER TABLE ".$old_session_table." RENAME TO ".$new_session_table."";
                    $stmt4 = $conn->prepare($sql4);
                    $stmt4->execute();
                }
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