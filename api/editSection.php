<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$section = $_SERVER['REQUEST_URI'];

for ($i = strlen($section) - 1; $i > 0; $i--) {
    if ($section[$i] == "/") {
        $section = substr($section, ($i + 1));
        $section = str_replace("_"," ", $section);
        break;
    }
}

//RESERVED
function random_str(
    int $length = 64,
    string $keyspace = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
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

$code = random_str(8);
$false = "FALSE";

switch($_SESSION['method']) {
    case "GET":
        break;
    case "POST":
        //GET FULL NAME OF TEACHER
        $teacherName = "SELECT AdviserName FROM section_list WHERE SectionName = '$section'";
        $tn = $conn->prepare($teacherName);
        $tn->execute();
        $t_name = $tn->fetchColumn();

    
        $teacher_email = "";
        //GET EMAIL
        $t_email = "SELECT Email FROM accounts WHERE concat(GivenName, ' ', MiddleName, ' ', LastName) = '$t_name'";
        $t_e = $conn->prepare($t_email);
        $t_e->execute();
        $teacher_email = $t_e->fetchColumn();

        //LOGOUT TEACHER
        if ($teacher_email != '' && $teacher_email != false) {
            $logged = "FALSE";
            $sql0 = "UPDATE sessions SET Logged = '$logged'
                    WHERE UserEmail = '$teacher_email'
                    AND Logged = 'TRUE'";
            $stmt0 = $conn->prepare($sql0);
            $stmt0->execute();
        } else {
            $t_email2 = "SELECT Email FROM accounts WHERE concat(GivenName, ' ', LastName) = '$t_name'";
            $t_e2 = $conn->prepare($t_email2);
            $t_e2->execute();
            $teacher_email = $t_e2->fetchColumn();

            $logged = "FALSE";
            $sql0 = "UPDATE sessions SET Logged = '$logged'
                    WHERE UserEmail = '$teacher_email'
                    AND Logged = 'TRUE'";
            $stmt0 = $conn->prepare($sql0);
            $stmt0->execute();
        }

        $user = json_decode( file_get_contents('php://input') );
        $adviserName = $user->adviserName;
        $gradeLevel = $user->gradeLevel;
        $sectionName = $user->sectionName;
        
        $sql = "UPDATE section_list SET GradeLevel = '$gradeLevel', SectionName = '$sectionName', AdviserName = '$adviserName'
                WHERE SectionName = '$section'";

        $stmt = $conn->prepare($sql);
        
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }

        $sql2 = "UPDATE accounts SET Section = '$sectionName' WHERE Section = '$section'";

        $stmt2 = $conn->prepare($sql2);
        
        if($stmt2->execute()) {
            $response2 = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response2 = ['status' => 0, 'message' => 'Failed to create record.'];
        }

        echo "\n".json_encode($response);
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
}



?>